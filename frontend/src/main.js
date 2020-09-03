import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Axios from 'axios'
import moment from 'moment'

Axios.defaults.withCredentials = true
Vue.prototype.$http = Axios

Vue.prototype.moment = moment
moment.locale('fr')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
