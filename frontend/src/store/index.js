import Vue from 'vue'
import Vuex from 'vuex'
// import Axios from 'axios'
// import router from '../router'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    })],

  state: {
      isLogged: false
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
