import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import VueMask from 'v-mask'

import dateFilter from '@/filters/date.filter'
import messagePlugin from '@/utils/message.plugin'
import Loader from '@/components/app/Loader'

Vue.use(messagePlugin)
Vue.component('Loader', Loader)
Vue.use(VueMask, {
  placeholders: {
    '#': /\d/, 
    A: /[a-zA-Z]/, transform: v => v.toLocaleUpperCase(),
    T: /\d?/,
  }
})
Vue.filter('date', dateFilter)
Vue.config.productionTip = false
const firebaseConfig = {
  apiKey: "AIzaSyBwpK25wHgTTidzyjboboovi-qCG03N7-Y",
  authDomain: "ci-ace-cajou.firebaseapp.com",
  projectId: "ci-ace-cajou",
  storageBucket: "ci-ace-cajou.appspot.com",
  messagingSenderId: "372567546284",
  appId: "1:372567546284:web:943a63590c98a86d9dc209",
  measurementId: "G-32Q1V0F9PS"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  let app
  firebase.auth().onAuthStateChanged(() => {
    if (!app) {
      app = new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
      }).$mount('#app')
    }
  })

