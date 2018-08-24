import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import payload from './modules/payload'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		auth,
		payload
	}
})
