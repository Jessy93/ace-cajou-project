import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import formTrans from './form-transf'
import snackbar from './snackpopup'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
  },
  actions: {
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    },
  },
  getters: {
    error: s => s.error,
  },
  modules: {
    auth, formTrans, info, snackbar
  }
})
