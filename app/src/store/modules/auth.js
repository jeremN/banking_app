import Vue 				from 'vue'
import axios 			from 'axios'
import router 			from '../../routes'
import firebase 		from 'firebase'
import Utilities 		from '../../utilities'
import moment			from 'moment'

const state = Utilities.initialAuthState()

const mutations = {
	set_User( state, payload ) {
		state.user = state.user === null ? Object.assign({}, payload) : Object.assign({}, state.user, payload)
		state.userRequest = firebase.auth().currentUser
	},
	update_User( state, {payload, key}) {
		state[key] = payload
	},
	clear_State( state ) {
		state = Utilities.initialAuthState()
	},
	set_Loading( state, bool ) {
		state.loading = bool
	},
	set_Error( state, error ) {
		console.log(error)
		const hasError = {
			msg: error.errorMessage,
			hasError: true
		}
		state.error = error
	},
	clear_Error( state ) {
		state.error = null
	}
}

const actions = {
	user_SignUp( {commit, dispatch}, payload ) {
		commit('set_Loading', true)
		commit('clear_Error')
		firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
			.then( res => {
				const newUser = {
					id: res.user.uid,
					email: res.user.email,
					name: payload.name,
					verified: res.user.emailVerified,
					created: Utilities.currentDate()
				}
				commit('set_User', newUser)
				commit('set_Loading', false)
				dispatch('set_UserProfile')
				router.push('Home')
			})
			.catch( error => {
				commit('set_Loading', false)
				commit('set_Error', error)
			})
	},
	//Set default datas properties for user (profile, datas etc...)
	set_UserProfile( {commit, state}, payload ) {
		firebase.database().ref('/users/'+state.user.id+'/').set({
			profile: {
				id: state.user.id,
				name: state.user.name,
				verified: state.user.verified,
				create: state.user.created,
			},
			datas: {
				temporary: {
					activeMonth: Utilities.currentMonth() ,
					activeYear: Utilities.currentYear(),
					currentExpenses: false
				},
				expenses: false,
				searches: {
					categories: false,
					names: false
				}
			}
		}).then( res => console.log(res))
		.catch(err => console.log(err))
	},
	//Get saved user profile
	get_UserProfile( {commit, dispatch, rootState} ) {
		if(!state.user.id) { return }
		firebase.database().ref('/users/'+state.user.id+'/profile/').once('value')
			.then((payload) => { 
				commit('set_User', payload.val()) 
				dispatch('get_UserDatas')
			})
			.catch(err => console.log(err))
	},
	//Get saved user datas
	get_UserDatas( {commit, rootState} ) {
		commit('set_Loading', true)
		let datas = firebase.database().ref(`/users/${rootState.auth.user.id}/datas/`)
		datas.once('value', function(d) {
			rootState.payload.items = d.val().temporary.currentExpenses
			rootState.payload.savedMonth = d.val().temporary.activeMonth
			rootState.payload.savedYear = d.val().temporary.activeYear
			rootState.payload.expenses = d.val().expenses
			rootState.payload.searches = d.val().searches
		})
			.then(() => {
				rootState.payload.currentMonth = Utilities.currentMonth()
				rootState.payload.currentYear = Utilities.currentYear()
				if( rootState.payload.savedMonth !== rootState.payload.currentMonth ) {
					rootState.payload.popin = {
						isActiv: true,
						message: 'La sauvegarde du mois précédent va commencer',
						type: 'month'
					}
				}
				else if( rootState.payload.savedYear !== rootState.payload.currentYear 
					&& rootState.payload.savedMonth !== rootState.payload.currentMonth) {
					rootState.payload.popin = {
						isActiv: true,
						message: 'La sauvegarde de l\'année précédente va commencer',
						type: 'year'
					}
				}
				commit('set_Loading', false)
			})
			.catch(err => console.log(err))
	},
	//Sign in
	user_SignIn( {commit, dispatch}, payload ) {
		commit('set_Loading', true)
		commit('clear_Error')
		firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
			.then( res => {
				const newUser = {
					id: res.user.uid,
					email: res.user.email,
					name: '',
					lastConnection: null,
					actualConnection: null,
					verified: res.user.emailVerified,
				}
				commit('set_User', newUser)
				commit('set_Loading', false)
				dispatch('get_UserProfile')
				router.push('Home')
			})
			.catch( error => {
				commit('set_Loading', false)
				commit('set_Error', error)
			})
	},
	//Sign out
	user_SignOut( {commit} ) {
		firebase.auth().signOut().then( res => {
			commit('clear_State')
			router.push('/')
		})
		.catch( err => console.log(err))
	},
	//Auto sign in
	auto_SignIn( {commit, dispatch}, payload ) {
		const user = {
			id: payload.uid,
			email: payload.email
		}
		commit('set_User', user)
		dispatch('get_UserProfile')
	},
	//Update Name
	update_UserName( {commit}, payload ) {
		firebase.database().ref('/users/'+state.user.id+'/profile/name').set(payload).then( res => {
			console.log(res)
			commit('update_User', payload, 'name')
		})
	},
	send_UserEmailVerification( {commit, state, rootState} ) {
		let credential = [state.user.email, payload.oldPassword]
		const callback = firebase.auth().currentUser.sendEmailVerification().then( res => {
			if( res.success ) {
				rootState.payload.popin = {
					isActiv: true,
					message: 'L\'email est parti, pensez à regarder dans votre messagerie',
					type: 'verif'
				}
			}
		})
		.catch( err => {
			rootState.payload.popin = {
				isActiv: true,
				message: 'L\'envoi de l\'email a échoué, veuillez réessayer plus tard',
				type: 'verif'
			}
		})
		dispatch('user_ReAuthenticate', credential, callback)
	},
	//Update email
	update_UserEmail( {commit, dispatch, state, rootState}, payload ) {
		console.log(payload)
		const credentials = firebase.auth.EmailAuthProvider.credential(state.user.email, payload.oldPassword)
		const callback = firebase.auth().currentUser.updateEmail(payload.email).then( (res) => {
			rootState.payload.popin = {
				isActiv: true,
				message: 'L\'adresse email a été changé avec succès',
				type: 'email'
			}
			commit('update_User', payload.email, 'email')
		})
		.catch( err => {
			rootState.payload.popin = {
				isActiv: true,
				message: 'Le changement d\'adresse email a échoué, veuillez réessayer',
				type: 'email'
			}
			console.log(err)
		})
		dispatch('user_ReAuthenticate', credentials, callback)
	},
	//Change password
	change_UserPassword( {commit, state, dispatch, rootState}, payload ) {
		const credentials = firebase.auth.EmailAuthProvider.credential(state.user.email, payload.oldPassword)
		const callback = firebase.auth().currentUser.updatePassword(payload.newPassword).then( res => {
			rootState.payload.popin = {
				isActiv: true,
				message: 'Le mot de passe a été changé avec succès',
				type: 'password'
			}
		})
		.catch( err => {
			rootState.payload.popin = {
				isActiv: true,
				message: 'Le changement de mot de passe a échoué, veuillez réessayer',
				type: 'password'
			}
		})
		dispatch('user_ReAuthenticate', credentials, callback)
	},
	delete_Account( {commit, state, dispatch, rootState}, payload ) {
		const credentials = firebase.auth.EmailAuthProvider.credential(state.user.email, payload.oldPassword)
		const callback = firebase.auth().currentUser.delete().then( () => {
			rootState.payload.popin = {
				isActiv: true,
				message: 'Votre compte a été effacer, vous allez être déconnecter',
				type: 'account'
			}
			dispatch('user_SignOut')
		})
		.catch( err => {
			rootState.payload.popin = {
				isActiv: true,
				message: 'L\'effacement a échouer, veuillez réessayer',
				type: 'account'
			}
		})
		dispatch('user_ReAuthenticate', credentials, callback)
	},
	//Re auth user
	user_ReAuthenticate( {commit}, credential, fn ) {
		state.userRequest.reauthenticateAndRetrieveDataWithCredential(credential)
			.then(fn)
			.catch(err => console.log(err));
	}
}

const getters = {
	user( state, getters ) {
		return state.user
	},
	isAuthenticated( state, getters ) {
		console.log(state.user)
		return state.user !== null
	},
	hasError( state, getters ) {
		return state.error !== null
	},
	isLoading( state, getters ) {
		return state.loading
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}