import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store/store'
import firebase from 'firebase'
import './registerServiceWorker'
import './filters'

Vue.config.productionTip = false
Vue.use(Vuex)

console.log(process.env);
/*
const firebaseKeys = {
	apiKey: process.env.VUE_APP_FIREBASE_KEY, 
	authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN, 
	databaseURL: process.env.VUE_APP_FIREBASE_DB_URL, 
	projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID, 
	storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET, 
	messagingSenderId: process.env.VUE_APP_FIREBASE_MSG_SENDER_ID
}
*/
const firebaseKeys = {
  apiKey: "AIzaSyD_qotVZSquQM5tB91MMx90-uzQG0u6Xh0",
  authDomain: "banking-app-c457f.firebaseapp.com",
  databaseURL: "https://banking-app-c457f.firebaseio.com",
  projectId: "banking-app-c457f",
  storageBucket: "banking-app-c457f.appspot.com",
  messagingSenderId: "259505444433"  
}

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp(firebaseKeys),
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
   	    store.dispatch('auto_SignIn', user) 
	  }
    })
  }
}).$mount('#app')
