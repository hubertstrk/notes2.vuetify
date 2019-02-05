import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'
import store from './store'

import Notifications from '../lib/notifications'

import './side-effects'
// import colors from 'vuetify/es5/util/colors'

Vue.use(Notifications, {store, options: {timeout: 3000}})

Vue.use(Vuetify, {
  theme: {
    primary: '#42b883',
    secondary: '#35495e'
  }
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
