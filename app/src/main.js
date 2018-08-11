import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './routes'
import store from './store/store'
import Vuelidate from 'vuelidate'
import firebase from 'firebase'

Vue.use(Vuelidate)

firebase.initializeApp({
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
