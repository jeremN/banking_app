import Vue from 'vue'
import axios from 'axios'
import router from '../../routes'

const initialState = () => {
	return {
		tokenId: null,
		userId: null,
		user: null,
		lastConnection: null,
		actualConnection: null
	}
}

const state = initialState()

const mutations = {
	authUser( state, datas ) {

	},
	clearAuthData( state ) {
		state = initialState()
	}
}

const actions = {
	setLogoutTimer( {commit}, expireTime ) {
		setTimeout( () => {
			commit('clearAuthData')
		}, expireTime * 1000 )
	},
	signUp( {commit, dispatch}, authDatas ) {

	},
	logIn( {commit, dispatch}, authDatas ) {

	},
	autoLogin( {commit} ) {

	},
	logOut( {commit} ) {

	},
}

const getters = {
	user( state ) {
		return state.user
	},
	isAuthenticated( state ) {
		return state.tokenId !== null
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}