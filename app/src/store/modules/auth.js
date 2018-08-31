import Vue from 'vue'
import axios from 'axios'
import router from '../../routes'
import firebase from 'firebase'
import moment from 'moment'

const currentDate = moment().format('DD/MMMM/YYYY')
const currentYear = moment().format('YYYY')
const currentMonth = moment().format('MMMM')

const initialState = () => {
	return {
		user: null,
		loading: false,
		error: null
	}
}

const state = initialState()

const getTime = () => {}

const mutations = {
	set_User( state, payload ) {
		state.user = Object.assign({}, payload)
	},
	clearState( state ) {
		state = initialState()
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
					created: currentDate
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
					activeMonth: currentMonth,
					activeYear: currentYear,
					currentExpenses: false
				},
				expenses: false,
				searches: {
					categories: false,
					names: false
				}
			}
		})
	},
	//Get saved user profile
	get_UserProfile( {commit, dispatch, rootState} ) {
		if(!state.user.id) { return }
		firebase.database().ref('/users/'+state.user.id+'/profile/').once('value')
			.then((payload) => { 
				commit('set_User', payload.val()) 
				dispatch('get_UserDatas')
			})
	},
	//Get saved user datas
	get_UserDatas( {commit, rootState} ) {
		let datas = firebase.database().ref(`/users/${rootState.auth.user.id}/datas/`)
		datas.once('value', function(d) {
			rootState.payload.items = d.val().temporary.currentExpenses
			rootState.payload.savedMonth = d.val().temporary.activeMonth
			rootState.payload.savedYear = d.val().temporary.activeYear
			rootState.payload.expenses = d.val().expenses
		})
			.then(() => {
				rootState.payload.currentMonth = currentMonth
				rootState.payload.currentYear = currentYear
				if(rootState.payload.savedMonth !== currentMonth) {
					rootState.payload.popin = {
						isActiv: true,
						message: 'La sauvegarde du mois précédent va commencer',
						type: 'month'
					}
				}
				/*else if( rootState.payload.savedYear !== currentYear) {
					rootState.payload.popin = {
						isActiv: true,
						message: 'La sauvegarde de l\'année précédente va commencer',
						type: 'year'
					}
				}*/
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
		firebase.auth().signOut()
		commit('clearState')
		router.push('Index')
	},
	//Auto sign in
	auto_SignIn( {commit, dispatch}, payload ) {
		const user = {
			id: payload.uid,
			email: payload.email
		}
		commit('set_User', user)
		dispatch('get_UserProfile')
	}
}

const getters = {
	user( state ) {
		return state.user
	},
	isAuthenticated( state ) {
		return state.user !== null
	},
	hasError( state ) {
		return state.error !== null
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}