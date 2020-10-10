import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Axios from 'axios'
import moment from 'moment'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faWater } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons'
import { faFish} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faWater)
library.add(faMapMarkerAlt)
library.add(faArrowsAltH)
library.add(faFish)

Vue.component('font-awesome-icon', FontAwesomeIcon)

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
