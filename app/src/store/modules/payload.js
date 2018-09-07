import Vue 						from 'vue'
import axios 					from 'axios'
import firebase 			from 'firebase'

import * as fakeDatas from '../../fakeDatas.json'
import Utilities 			from '../../utilities'

const datas = JSON.stringify(fakeDatas)
const state = Utilities.initialPayloadState()

const mutations = {
	Add_Expenses( state, payload ) {
		state.items = payload
	},
	Init_Expenses( state, payload ) {
		state.expenses = []
		state.expenses.push({
			year: state.savedYear,
			months: []
		})
	},
	New_MonthExpense( state, payload ) {
		//Push new month datas in the obj, filtered by savedYear
		state.expenses.filter( item => {
			if( item.year === state.savedYear ) {
				item.months.push(payload)
			}
		})
	},
	New_Year( state ) {
		state.expenses.push({
			year: Utilities.currentYear(),
			months: false
		})
	},
	New_Month( state, payload ) {
		state.savedMonth = payload.month
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
		if( !expensesArray.length ) { expensesArray = false }
		
		//send to database
		firebase.database().ref(`/users/${rootState.auth.user.id}/datas/temporary/currentExpenses`).set(expensesArray)
		
		//commit to mutation
		commit('Add_Expenses', expensesArray)
	},
	Edit_Expenses( {commit, rootState, state}, payload ) {
		let expensesArray = state.items
		
		//search item, if index equal to id then replace existing item by edited one
		expensesArray.map( (current, index) => {
			if( index === payload.id ) {
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
	Prepare_MonthExpenses( {commit, state, rootState, dispatch}, isNewYear=false ) {

		const datas = {
			categories: [],
			inbank: '',
			income: '',
			outcome: '', 
			month: state.savedMonth
		}

		//Make all value number type (avoid string)
		const arr = state.items.map( item => {
			return {
				name: item.name,
				value: Number(item.value),
				category: item.category,
				type: item.type,
				date: item.date
			}
		})

		//Output new object with all key and values as array
		const reduceArray = arr.reduce((item, next) => {
			let cat = next.category 
			let type = next.type
			
			if( !item[cat] ) {
				item[cat] = []
			}
			
			if( !item[type] ) {
				item[type] = []
			}
			item[cat].push(next.value)
			item[type].push(next.value)

			return item
		}, {})

		//Push value inside tempObj, and sum all values in array for each key
		Object.keys(reduceArray).map( key => {
			if( key === 'income' ) {
				datas.incomes = parseFloat(Utilities.sum(reduceArray[key]).toFixed(2))
			}
			else if( key === 'outcome' ) {
				datas.outcomes = parseFloat(Utilities.sum(reduceArray[key]).toFixed(2))
			}
			else {
				datas.categories.push({
					name: key,
					value: Utilities.sum(reduceArray[key])
				})
			}
		})

		//If state.expenses is false, then commit init_expenses (create the expenses obj)
		if( !state.expenses ) {
			commit('Init_Expenses')
		}
		commit('New_MonthExpense', datas)

		if( isNewYear ) {
			commit('New_Year')
			firebase.database().ref(`/users/${rootState.auth.user.id}/datas/temporary/activeYear`).set(Utilities.currentYear())		
		}

		dispatch('Post_MonthExpenses')
	},
	Post_MonthExpenses( {commit, state, rootState} ) {
		//Add datas to firebase
		firebase.database().ref(`/users/${rootState.auth.user.id}/datas/expenses`).set(state.expenses)
			.then( res => {
				console.log('Expenses added to database')
				commit('New_Month', Utilities.currentMonth())
				commit('Add_Expenses', [])
				commit('Set_Popin', {
					isActiv: false,
					message: '',
					type: '' 
				})
				firebase.database().ref(`/users/${rootState.auth.user.id}/datas/temporary/currentExpenses`).set(false)		
				firebase.database().ref(`/users/${rootState.auth.user.id}/datas/temporary/activeMonth`).set(Utilities.currentMonth())		
			})
			.catch(err => console.log(err))
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