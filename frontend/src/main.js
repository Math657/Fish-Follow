import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Axios from 'axios'
import moment from 'moment'
import TextareaAutosize from 'vue-textarea-autosize'
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
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCheck} from '@fortawesome/free-solid-svg-icons'
import { faExclamationCircle} from '@fortawesome/free-solid-svg-icons'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import titleMixin from './mixins/titleMixin'


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
library.add(faPlus)
library.add(faCheck)
library.add(faExclamationCircle)
library.add(faInfoCircle)
library.add(faSearch)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Axios.defaults.withCredentials = true
Vue.prototype.$http = Axios

Vue.prototype.moment = moment
moment.locale('fr')

Vue.use(TextareaAutosize)

Vue.config.productionTip = false

Vue.mixin({
    methods: {
      capitalizeFirstLetter: str => str.charAt(0).toUpperCase() + str.slice(1),
      loggout() {
        localStorage.clear()
        sessionStorage.clear()
        this.$store.dispatch('LogOut')
      },
      checkIfTokenIsValid(err) {
        if (err.response) {
            if (err.response.data.message === 'Token non valide') {
                this.loggout()
            }
            else {
                console.log(err)
            }
        }
        else {
            console.log(err)
        }
            
      }
    }
})

Vue.mixin(titleMixin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
