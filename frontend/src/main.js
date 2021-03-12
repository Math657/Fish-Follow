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
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import titleMixin from './mixins/titleMixin'
import cookiesMixin from './mixins/cookiesMixin'
import GSignInButton from 'vue-google-signin-button'

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
library.add(faTrashAlt)

Vue.use(GSignInButton)

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
            this.eraseCookie('userId')
            this.eraseCookie('userProfilPic')
            this.eraseCookie('isLogged')
            this.eraseCookie('isAdmin')
            localStorage.clear()
            sessionStorage.clear()
            this.$store.dispatch('LogOut')
            this.$root.$refs.A.forceRerender()
            this.$root.$refs.B.forceRerender()
            this.$root.$refs.C.forceRerender()
            router.push('/')
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
        },
        createCookie(name, value, days) {
            if (days) {
                let date = new Date()
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
                var expires = '; expires=' + date.toGMTString()
            }
            else expires = ''
            document.cookie = name + '=' + value + expires + '; path=/'
        }, 
        readCookie(name) {
            let nameEQ = name + '='
            let ca = document.cookie.split(';')
            for(let i = 0; i < ca.length; i++) {
                let c = ca[i]
                while (c.charAt(0) === ' ') c = c.substring(1, c.length)
                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length)
                }
            }
            return null
        },
        eraseCookie(name) {
            this.createCookie(name,'', -1)
        },
        checkUserId() {
            if (this.readCookie('userId') !== '') {
                return this.readCookie('userId')
            } else if (this.$store.state.userId.length !== '') {
                return this.$store.state.userId
            } else this.loggout()
        },
        checkIfLogged() {
            if (this.readCookie('isLogged') === 'true') {
                return true
            }
            else if (this.$store.state.isLogged) {
                return this.$store.state.isLogged
            } else {
                return false
            }
        },
        checkIfAdmin() {
            if (this.readCookie('isAdmin') === true) {
                return this.readCookie('isAdmin')
            }
            else if (this.$store.state.isAdmin) {
                return this.$store.state.isAdmin
            }
        },
        getProfilPic() {
            if (this.readCookie('userProfilPic')) {
                return this.readCookie('userProfilPic')
            } else return this.$store.state.userProfilPic 
        },
        test() {
            console.log('function!')
        }
    }
})

Vue.mixin(titleMixin)
Vue.mixin(cookiesMixin)
// export default { 
//     methods: this.checkIfLogged()
// }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
