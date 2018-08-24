import Vue from 'vue'
import axios from 'axios'
import firebase from 'firebase'

import * as fakeDatas from '../../fakeDatas.json'

const initialState = () => {
	return {
		items: [],
		months: [],
		currentYear: null,
		currentMonth: {
			month: null,
			income: 0,
			outcome: 0,
			saved: 0,
			categories: [],
		}
	}
}
const datas = JSON.stringify(fakeDatas);
console.log(datas)
const state = initialState()

const mutations = {
	New_Expenses( state, payload ) {
		state.items.push(payload)
	},
}

const actions = {
	Add_FakeDatas( {commit} ) {
		firebase.database().ref('/test/').push(fakeDatas)
			.then(res => console.log(res))
			.catch(err => console.log(err))

	},
	Get_Temporary( {commit}, payload ) {
		firebase.database().ref('/')
	},
	Set_Expenses( {commit}, payload ) {
		commit('New_Expenses', payload)
	},
	Post_Expenses( {commit}, payload ) {

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