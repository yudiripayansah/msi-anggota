import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: localStorage.getItem('msiAppAnggota') != null ? JSON.parse(localStorage.getItem('msiAppAnggota')) : [],
  },
  getters: {
    user: state => state.user,
  },
  mutations: {
    setUser(state,payload){
      state.user = payload
      localStorage.setItem('msiAppAnggota', JSON.stringify(state.user))
    },
    removeUser(state){
      state.user = []
      localStorage.removeItem('msiAppAnggota')
    }
  },
  actions: {
    login({commit},payload) {
      commit('setUser',payload)
    },
    logout({commit}) {
      commit('removeUser')
    }
  },
  modules: {
  }
})
