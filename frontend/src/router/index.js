import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignupPage from '../views/SignupPage.vue'
import PostFish from '../views/PublishFish.vue'
import MyProfile from '../views/MyProfile.vue'
import UserProfile from '../views/UserProfile.vue'
import store from '../store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
        // requireAuth: true
    }
  },
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
      path: '/login',
      name: 'Login',
      component: Home
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
      name: 'MyProfile',
      component: MyProfile,
      meta: {
          requireAuth: true
      }
  },
  {
      path: '/user/:id',
      name: 'user',
      component: UserProfile,
      meta: {
          requireAuth: true
      }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (store.state.isLogged) {
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
