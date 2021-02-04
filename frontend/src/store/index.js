import Vue from 'vue'
import Vuex from 'vuex'
// import Axios from 'axios'
import router from '../router'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    })],

  state: {
      isLogged: false,
      isNavOpen: false,
      userId: '',
      url: process.env.VUE_APP_URL
  },
  mutations: {
    LOGGED_IN(state) {
        state.isLogged = true
    },
    LOGGED_OUT(state) {
        state.isLogged = false
    },
    TOGGLE_NAV(state) {
        state.isNavOpen = !state.isNavOpen
    },
    STORING_ID(state) {
        state.userId = JSON.parse(localStorage.getItem('userID'))
    }
  },
  actions: {
      Logged({ commit }) {
          commit('LOGGED_IN')
          router.push('/home')
      },
      LogOut({ commit }) {
          commit('LOGGED_OUT')
          router.push('/login')
      },
      NavOpen({ commit }) {
          commit('TOGGLE_NAV')
      },
      StoreId({ commit }) {
          commit('STORING_ID')
      }
      
  },
  modules: {
  }
})
