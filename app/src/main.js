import Vue          from 'vue'
import Vuex         from 'vuex'
import App          from './App.vue'
import router       from './routes'
import store        from './store/store'
import Vuelidate    from 'vuelidate'
import firebase     from 'firebase'
import './filters'

Vue.use(Vuex)

const firebaseConfig = {
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
