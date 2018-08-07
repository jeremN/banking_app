import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store/store'

import Home from './components/home/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
]

export default new VueRouter({
	mode: 'history',
	routes
})