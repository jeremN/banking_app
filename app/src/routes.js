import Vue 				from 'vue'
import VueRouter 		from 'vue-router'

import store 			from './store/store'

import Home from './components/home/Home.vue'
import Main from './components/home/Main.vue'
import Signup 			from './components/login/Signup.vue'
import Signin 			from './components/login/Signin.vue'
import Notfound 		from './components/home/Notfound.vue'
import LastYear 		from './components/home/Olders/LastYear.vue'
import Profile 			from './components/profile/Profile.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/Home',
		name: 'Home',
		component: Home,
		beforeEnter(to, from, next) {
			store.state.user !== null && from.path !== '/Home' ? next() : next('/')
		}
	},
	{
		path: '/',
		name: 'Index',
		component: Main
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
	{
		path: '/LastYear',
		name: 'Lastyear',
		component: LastYear,
		beforeEnter(to, from, next) {
			store.state.user !== null && from.path !== '/LastYear' ? next() : next('/')
		}
	},
	{
		path: '/Profile',
		name: 'Profile',
		component: Profile,
		beforeEnter(to, from, next) {
			store.state.user !== null && from.path !== '/Profile' ? next() : next('/')
		}
	},
	{
		path: '*',
		name: 'Notfound',
		component: Notfound
	}
]

export default new VueRouter({
	mode: 'history',
	routes
})