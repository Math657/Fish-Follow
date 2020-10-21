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
      isNavOpen: false
  },
  mutations: {
    LOGGED_IN(state) {
        state.isLogged = true
    },
    LOGGED_OUT(state) {
        state.isLogged = false
    },
    toggleNav(state) {
        state.isNavOpen = !state.isNavOpen
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
          commit('toggleNav')
      },
      
  },
  modules: {
  }
})
