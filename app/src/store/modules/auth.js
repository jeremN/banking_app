import Vue from 'vue'
import axios from 'axios'
import router from '../../routes'
import firebase from 'firebase'
import moment from 'moment'

const now = moment().format('DD MM YYYY')
const initialState = () => {
	return {
		user: null,
		loading: false,
		error: null,
		connection: {
			last: null,
			actual: now
		}
	}
}

const state = initialState()

const getTime = () => {}

const mutations = {
	setUser( state, payload ) {
		state.user = Object.assign({}, payload)
		console.log(state)
	},
	setConnection( state, payload ) {

	},
	clearState( state ) {
		state = initialState()
	},
	setLoading( state, bool ) {
		state.loading = bool
	},
	setError( state, error ) {
		console.log(error)
		const hasError = {
			msg: error.errorMessage,
			hasError: true
		}
		state.error = error
	},
	clearError( state ) {
		state.error = null
	}
}

const actions = {
	userSignUp( {commit, dispatch}, payload ) {
		commit('setLoading', true)
		commit('clearError')
		firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
			.then( res => {
				const newUser = {
					id: res.user.uid,
					email: res.user.email,
					name: payload.name,
					verified: res.user.emailVerified,
					created: now
				}
				const newConnection = {
					lastConnection: now,
				}
				commit('setConnection', newConnection)
				commit('setUser', newUser)
				commit('setLoading', false)
				dispatch('set_UserProfile')
				router.push('Home')
			})
			.catch( error => {
				console.log(error)
				commit('setLoading', false)
				commit('setError', error)
			})
	},
	set_UserProfile( {commit, state}, payload ) {
		firebase.database().ref('/users/'+state.user.id+'/').set({
			profile: {
				id: state.user.id,
				name: state.user.name,
				verified: state.user.verified,
				create: state.user.created,
				lastConnection: state.user.lastConnection
			}
		})
	},
	get_UserProfile( {commit} ) {
		if(!state.user.id) {
			return
		}
		let db = firebase.database().ref('/users/'+state.user.id+'/profile/')
		db.once('value').then(function(payload) {
			console.log(payload.val())
			commit('setUser', payload.val())
		})
	},
	userSignIn( {commit, dispatch}, payload ) {
		commit('setLoading', true)
		commit('clearError')
		firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
			.then( res => {
				console.log(res)
				const newUser = {
					id: res.user.uid,
					email: res.user.email,
					name: '',
					lastConnection: null,
					actualConnection: null,
					verified: res.user.emailVerified,
				}
				commit('setUser', newUser)
				commit('setLoading', false)
				dispatch('get_UserProfile')
				router.push('Home')
			})
			.catch( error => {
				commit('setLoading', false)
				commit('setError', error)
			})
	},
	userSignOut( {commit} ) {
		firebase.auth().signOut()
		commit('clearState')
	},
	authStateChange( {commit} ) {

	},
	autoSignIn( {commit}, payload ) {
		const user = {
			id: payload.uid,
			email: payload.email
		}
		commit('setUser', user)
	}
}

const getters = {
	user( state ) {
		return state.user
	},
	isAuthenticated( state ) {
		return state.user !== null
	},
	getSignUpError( state ) {
		return state.error !== null
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}