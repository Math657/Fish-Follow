import Vue from 'vue'
import Vuex from 'vuex'
// import Axios from 'axios'
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
      userProfilPic: '',
      url: process.env.VUE_APP_URL,
      isAdmin: false
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
    },
    STORING_PROFIL_PIC(state) {
        state.userProfilPic = JSON.parse(localStorage.getItem('userProfilPic'))
    },
    IS_ADMIN(state) {
        state.isAdmin = true
    },
    IS_NOT_ADMIN(state) {
        state.isAdmin = false
    }
  },
  actions: {
      Logged({ commit }) {
          commit('LOGGED_IN')
      },
      LogOut({ commit }) {
          commit('IS_NOT_ADMIN')
          commit('LOGGED_OUT')
      },
      NavOpen({ commit }) {
          commit('TOGGLE_NAV')
      },
      StoreId({ commit }) {
          commit('STORING_ID')
      },
      StoreProfilPic({ commit }) {
          commit('STORING_PROFIL_PIC')
      },
      IsAdmin({ commit }) {
          commit('IS_ADMIN')
      }
  },
  modules: {
  }
})
