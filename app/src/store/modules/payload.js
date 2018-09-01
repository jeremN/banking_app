import Vue from 'vue'
import axios from 'axios'
import firebase from 'firebase'
import moment from 'moment'

import * as fakeDatas from '../../fakeDatas.json'
import Utilities from '../../utilities'

const datas = JSON.stringify(fakeDatas)
const state = Utilities.initialPayloadState()


const mutations = {
	Add_Expenses( state, payload ) {
		state.items = payload
	},
	Set_Currents( state ) {
	},
	Set_Dates( state, payload ) {
		state.curentMonth = payload.month
		state.currentYear = payload.year
	},
	Set_Popin( state, payload ) {
		state.popin = {
			isActiv: payload.isActiv,
			message: payload.message,
			type: payload.type 
		}
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

		//send to database
		firebase.database().ref(`/users/${rootState.auth.user.id}/datas/temporary/currentExpenses`).set(expensesArray)
		
		//commit to mutation
		commit('Add_Expenses', expensesArray)
	},
	Edit_Inbank( {commit, rootState}, payload ) {

	},
	Post_PrevExpenses( {commit, dispatch, state, rootState}, payload, type ) {
		let arr = state.items.map( item => {
			return {
				name: item.name,
				value: Number(item.value),
				category: item.category,
				type: item.type,
				date: item.date
			}
		})
		const reducedArray = arr.reduce((item, next) => { // item stands for itemumulator
			const lastItemIndex = item.length -1
			const itemHasContent = item.length >= 1

			if(itemHasContent && item[lastItemIndex].category == next.category) {
				item[lastItemIndex].value += next.value
			} else {
			// first time seeing this entry. add it!
			// item[lastItemIndex +1] = next;
				if(next.type !== 'income') {
					item[lastItemIndex +1] = { category: next.category, value: next.value }
				}
			}
			return item
		}, [])
		console.log(reducedArray)
	},
	Close_Popin( {commit} ) {
		commit('Set_Popin', {
			isActiv: false,
			message: '',
			type: '' 
		})
	}
}

const getters = {
	Return_Expenses( state, rootState, getters ) {
		return state.items
	},
	Return_State( state, getters ) {
		return state
	},
	Return_2017( state, getters ) {
		return state.expenses
	},
	Return_Popin( state, getters ) {
		return state.popin
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}