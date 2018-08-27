import Vue from 'vue'
import axios from 'axios'
import firebase from 'firebase'

import * as fakeDatas from '../../fakeDatas.json'

const initialState = () => {
	return {
		items: [],
		months: [],
		savedYear: null,
		savedMonth: null,
		currentMonth: null,
		currentYear: null
	}
}
const datas = JSON.stringify(fakeDatas);
//console.log(datas)
const state = initialState()

const mutations = {
	New_Expenses( state, payload ) {
		state.items.push(payload)
	},
	Set_Currents( state, payload ) {
		state.savedMonth = payload.currentMonth
		state.savedYear = payload.currentYear
	},
	Set_CurrentExpenses( state, payload ) {
		state.items = payload
		console.log(state.items)
	}
}

const actions = {
	Add_FakeDatas( {commit} ) {
		const Test = fakeDatas
		firebase.database().ref('/test/userDatas').push(fakeDatas)
			.then(res => console.log(res))
			.catch(err => console.log(err))

	},
	Get_Temporary( {commit}, payload ) {
		let datas = firebase.database().ref('/test/userDatas')
		datas.on('value', function(data) {
			data.forEach( function(d) {
				let dataChild = d.val()
				console.log(dataChild)
				commit('Set_Currents', dataChild.dataTemp)
				commit('Set_CurrentExpenses', dataChild.datas[0].current.expenses)
			})
		})
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