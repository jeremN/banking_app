import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store/store'

import Home from './components/home/Home.vue'
import Signup from './components/login/Signup.vue'
import Signin from './components/login/Signin.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/Signup',
		name: 'Signup',
		component: Signup
	},
	{
		path: '/Signin',
		name: 'Signin',
		component: Signin
	},
]

export default new VueRouter({
	mode: 'history',
	routes
})