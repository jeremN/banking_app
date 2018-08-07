import Vue from 'vue'
import axios from 'axios'

const initialState = () => {
	return {
		items: [],
		monthReport: [],
		yearReport: []
	}
}

const state = initialState()

const mutations = {
	New_Expenses( state, data ) {
		state.items.push(data)
	}
}

const actions = {
	Set_Expenses( {commit}, data ) {
		commit('New_Expenses', data)
	}
}

const getters = {
	Return_Expenses( state, getters ) {
		console.log(state.items)
		return state
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}