import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router       from './routes'
import store        from './store/store'
import Vuelidate    from 'vuelidate'
import firebase     from 'firebase'
import './filters'

Vue.use(Vuelidate)

const firebaseConfig = {
  apiKey: "AIzaSyD_qotVZSquQM5tB91MMx90-uzQG0u6Xh0",
  authDomain: "banking-app-c457f.firebaseapp.com",
  databaseURL: "https://banking-app-c457f.firebaseio.com",
  projectId: "banking-app-c457f",
  storageBucket: "banking-app-c457f.appspot.com",
  messagingSenderId: "259505444433"
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp(firebaseConfig),
    firebase.auth().onAuthStateChanged( (user) => {
      if(user) {
        store.dispatch('auto_SignIn', user)
      }
    })
  }
})
