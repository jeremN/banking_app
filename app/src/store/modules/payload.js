import Vue from 'vue'
import axios from 'axios'
import firebase from 'firebase'
import moment from 'moment'

import * as fakeDatas from '../../fakeDatas.json'

const initialState = () => {
	return {
		items: [],
		months: [],
		savedYear: null,
		savedMonth: null,
		currentMonth: moment().format('MMMM'),
		currentYear: moment().format('YYYY')
	}
}
const datas = JSON.stringify(fakeDatas);
const state = initialState()


const mutations = {
	Add_Expenses( state, payload ) {
		if(!state.items) {
			state.items = []
		}
		state.items.push(payload)
	},
	Remove_Expenses( state, index ) {
		if(state.items.length) {
			state.items.slice(index, 1)
		}
	},
	Set_Currents( state ) {
	}
}

const actions = {
	Post_FakeDatas( {commit, rootState}, field ) {
		firebase.database().ref(`/users/${rootState.auth.user.id}/datas/`).set({
			expenses: fakeDatas.expenses,
			temporary: fakeDatas.temporary,
			searches: {
				categories: fakeDatas.searches.categories,
				names: fakeDatas.searches.names
			}
		})
		.then(res => console.log(res))
		.catch(err => console.log(res))
	},
	Post_Expenses( {commit, state, rootState}, payload ) {
		let expensesArray = !state.items ? [] : state.items
		expensesArray.push(payload)
		commit('Add_Expenses', payload)
		firebase.database().ref(`/users/${rootState.auth.user.id}/datas/temporary/currentExpenses`).set(expensesArray)
	},
	Delete_Expenses( {commit}, payload ) {
		
	}
}

const getters = {
	Return_Expenses( state, rootState, getters ) {
		return state
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}