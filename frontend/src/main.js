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
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { faWrench } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faWater)
library.add(faMapMarkerAlt)
library.add(faArrowsAltH)
library.add(faFish)
library.add(faTimes)
library.add(faCog)
library.add(faSignOutAlt)
library.add(faUser)
library.add(faHome)
library.add(faCameraRetro)
library.add(faComment)
library.add(faWrench)
library.add(faInfoCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Axios.defaults.withCredentials = true
Vue.prototype.$http = Axios

Vue.prototype.moment = moment
moment.locale('fr')

Vue.config.productionTip = false

Vue.mixin({
    methods: {
      capitalizeFirstLetter: str => str.charAt(0).toUpperCase() + str.slice(1),
      loggout() {
        localStorage.clear()
        sessionStorage.clear()
        this.$store.dispatch('LogOut')
      }
    }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
