import Vue from 'vue'
import firebase from 'firebase'

// import * as fakeDatas from '../../fakeDatas.json'
import { appUtils } from '@/functionsUtils'

//const datas = JSON.stringify(fakeDatas)
const state = appUtils.initialPayloadState()

const mutations = {
  	Add_Expenses( state, payload ) {
		state.items = payload
	},
	Add_Searches( state, payload ) {
		console.log(state.searches)
		state.searches = payload
		console.log(state.searches)
	},
	Init_Expenses( state, payload ) {
		state.expenses = []
		state.expenses.push({
			year: state.savedYear,
			months: []
		})
	}, 
	Update_Expenses( state, payload ) {
		state.expenses = payload
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
			year: appUtils.currentYear(),
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
	Post_Expenses( {commit, state, rootState, dispatch}, payload ) {
		//if state.item false then it's an empty array, else if equal state.item
		let expensesArray = !state.items ? [] : state.items
		
		//push new expense
		expensesArray.push(payload)
		
		//add to database
		firebase.database().ref(`/users/${rootState.auth.user.id}/datas/temporary/currentExpenses`).set(expensesArray).then( res => {
			dispatch('Post_Search', {name: payload.name, category: payload.category})
			//commit to mutation
			commit('Add_Expenses', expensesArray)
		})
		.catch(err => console.log(err))
		
	},
	Post_Search( {commit, state, rootState}, payload ) {
		const searches = state.searches

		//If key don't exist push it into array, else return false
		searches.names.indexOf(payload.name) === -1 ? searches.names.push(payload.name) : false
		searches.categories.indexOf(payload.category) === -1 ? searches.categories.push(payload.category) : false

		//add to databse
		firebase.database().ref(`/users/${rootState.auth.user.id}/datas/searches`).set(searches).then( res => {
			console.log('Searches terms added to database')
			//commit mutation
			commit('Add_Searches', searches)
		})
		.catch(err => console.log(err))
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
	Edit_Inbank( {commit, rootState, state}, payload ) {
		let expensesArray = state.expenses

		//Filter array by selected year, and find the corresponding month, then edit the inbank value
		expensesArray.filter( expense => {
			if(expense.year === payload.selectedYear) {
				expense.months.map( item => {
					if(item.month === payload.month) {
						return item.inbank = payload.val
					}
				})
			}
		})

		//send result to database
		firebase.database().ref(`/users/${rootState.auth.user.id}/datas/expenses`).set(expensesArray)
		//commit result to mutation
		commit('Update_Expenses', expensesArray)
	},
	Prepare_MonthExpenses( {commit, state, rootState, dispatch}, isNewYear=false ) {
		const datas = {
			categories: [],
			inbank: '',
			income: 0,
			outcome: 0, 
			month: state.savedMonth
		}

		if( state.items ) {
		
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
					datas.income = parseFloat(appUtils.sum(reduceArray[key]).toFixed(2))
				}
				else if( key === 'outcome' ) {
					datas.outcome = parseFloat(appUtils.sum(reduceArray[key]).toFixed(2))
				}
				else {
					datas.categories.push({
						name: key,
						value: appUtils.sum(reduceArray[key])
					})
				}
			})
		}

		if( !state.items) {
			datas.categories = [ {name: " ", value: 0} ]
		}

		//If state.expenses is false, then commit init_expenses (create the expenses obj)
		if( !state.expenses ) {
			commit('Init_Expenses')
		}
		commit('New_MonthExpense', datas)

		if( isNewYear ) {
			commit('New_Year')
			firebase.database().ref(`/users/${rootState.auth.user.id}/datas/temporary/activeYear`).set(appUtils.currentYear())		
		}
		dispatch('Post_MonthExpenses')
	},
	Post_MonthExpenses( {commit, state, rootState} ) {
		//Add datas to firebase
		firebase.database().ref(`/users/${rootState.auth.user.id}/datas/expenses`).set(state.expenses)
			.then( res => {
				console.log('Expenses added to database')
				commit('New_Month', appUtils.currentMonth())
				commit('Add_Expenses', [])
				commit('Set_Popin', {
					isActiv: false,
					message: '',
					type: '' 
				})
				firebase.database().ref(`/users/${rootState.auth.user.id}/datas/temporary/currentExpenses`).set(false)		
				firebase.database().ref(`/users/${rootState.auth.user.id}/datas/temporary/activeMonth`).set(appUtils.currentMonth())		
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
	Return_allExpenses( state, getters ) {
		return state.expenses
	},
	Return_CurrentYear( state, getters ) {
		return state.currentYear
	},
	Return_Popin( state, getters ) {
		return state.popin
	},
	Return_Suggestions( state, getters) {
		return state.searches
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}