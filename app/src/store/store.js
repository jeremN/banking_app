import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import days from './modules/byDay'
import months from './modules/byMonth'
import years from './modules/byYear'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		auth,
		days,
		months,
		years
	}
})
