import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store'

import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import Signin from './views/Signin.vue'
import Register from './views/Register.vue'
import Profil from './views/About.vue'
import Statistic from './views/Statistic.vue'
import Error404 from './views/Error.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'navbar-link--active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter(to, from, next) {
        store.state.user !== null && from.path !== '/Home' ? next() : next('/')
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/stats',
      name: 'stats',
      component: Statistic
    },
    {
      path: '/profil',
      name: 'profil',
      component: Profil
    },
    {
      path: '*',
      name: 'error404',
      component: Error404
    }
  ]
})
