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
		state.items = payload
	},
	Set_Currents( state ) {
	}
}

const actions = {
	/*Post_FakeDatas( {commit, rootState}, field ) {
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
	},*/
	Post_Expenses( {commit, state, rootState}, payload ) {
		//if state.item false then it's an empty array, else if equal state.item
		let expensesArray = !state.items ? [] : state.items
		
		//push new expense
		expensesArray.push(payload)
		
		//add to database
		firebase.database().ref(`/users/${rootState.auth.user.id}/datas/temporary/currentExpenses`).set(expensesArray)
		
		//commit to mutation
		commit('Add_Expenses', expensesArray)
	},
	Delete_Expenses( {commit, rootState, state}, payload ) {
		let expensesArray = state.items
		
		//remove expense from array
		expensesArray.splice(payload, 1)
		
		//if array is empty then equal false
		if(!expensesArray.length) { expensesArray = false }
		
		//send to database
		firebase.database().ref(`/users/${rootState.auth.user.id}/datas/temporary/currentExpenses`).set(expensesArray)
		
		//commit to mutation
		commit('Add_Expenses', expensesArray)
	},
	Edit_Expenses( {commit, rootState, state}, payload ) {
		let expensesArray = state.items
		
		//search item, if index equal to id then replace existing item by edited one
		expensesArray.map( (current, index) => {
			if(index === payload.id) {
				return current = payload.item
			}
		})

		console.log(expensesArray)

		//send to database
		firebase.database().ref(`/users/${rootState.auth.user.id}/datas/temporary/currentExpenses`).set(expensesArray)
		
		//commit to mutation
		commit('Add_Expenses', expensesArray)
	}
}

const getters = {
	Return_Expenses( state, rootState, getters ) {
		return state.items
	},
	Return_State( state, getters ) {
		return state
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}