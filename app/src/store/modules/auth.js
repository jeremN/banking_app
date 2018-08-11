import Vue from 'vue'
import axios from 'axios'
import router from '../../routes'
import firebase from 'firebase'

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
	setUser( state, datas ) {
		state.user = datas
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
	userSignUp( {commit, dispatch}, datas ) {
		commit('setLoading', true)
		commit('clearError')
		firebase.auth().createUserWithEmailAndPassword(datas.email, datas.password)
			.then( user => {
				console.log(user)
				const newUser = {
					id: user.uid,
					email: user.email,
					name: datas.name,
					lastConnection: null,
					actualConnection: null,
					verified: user.emailVerified,
					//created: 
				}
				commit('setUser', newUser)
				commit('setLoading', false)
				router.push('Home')
			})
			.catch( error => {
				console.log(error)
				commit('setLoading', false)
				commit('setError', error)
			})
	},
	userSignIn( {commit, dispatch}, datas ) {
		commit('setLoading', true)
		commit('clearError')
		firebase.auth().signInWithEmailAndPassword(datas.email, datas.password)
			.then( user => {
				console.log(user)
				const newUser = {
					id: user.uid,
					email: user.email,
					name: '',
					lastConnection: null,
					actualConnection: null,
					verified: user.emailVerified,
					//created: 
				}
				commit('setLoading', false)
				router.push('Home')
			})
			.catch( error => {
				console.log(error)
				commit('setLoading', false)
				commit('setError', error)
			})
	},
	userSignOut( {commit} ) {
		firebase.auth().signOut()
			.then( () => {

			})
			.catch( error => {
				console.log(error)
			})
	},
	authStateChange( {commit} ) {

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