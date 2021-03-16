import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignupPage from '../views/SignupPage.vue'
import PasswordReset from '../views/PasswordReset'
import PostFish from '../views/PublishFish.vue'
import MyProfilePage from '../views/MyProfilePage.vue'
import UserProfilePage from '../views/UserProfilePage.vue'
import store from '../store'
import cookiesMixin from '../mixins/cookiesMixin'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
  },
  {
      path: '/signup',
      name: 'Signup',
      component: SignupPage
  },
  {
      path: '/forgot',
      name: 'Forgot',
      component: PasswordReset
  },
  {
      path: '/reset/:token/:id',
      name: 'Reset',
      component: PasswordReset
  },
  {
      path: '/post',
      name: 'PostFish',
      component: PostFish,
      meta: {
          requireAuth: true
      }
  },
  {
      path: '/myprofile/:id',
      name: 'MyProfilePage',
      component: MyProfilePage,
      meta: {
          requireAuth: true
      }
  },
  {
      path: '/user/:id',
      name: 'UserProfilePage',
      component: UserProfilePage,
      meta: {
          requireAuth: true
      },
      beforeEnter: (to, from, next) => {
          if (cookiesMixin.methods.checkUserId() === to.params.id) {
              next(`/myprofile/${store.state.userId}`)
          }
          else next()
      }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Check if user is logged
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (cookiesMixin.methods.checkIfLogged() === true) {
            next()
        }
        else if (!store.state.isLogged) {
            next('/')
        }   
    } 
    else {
        next()
    }
})

export default router