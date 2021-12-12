import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      loading: false,
      name: null,
      role: null,
      token: null,
      error: null,
    },
  },
  mutations: {
    LOGIN_USER_LOADING(state) {
      state.user.loading = true
    },
    LOGIN_USER_SUCCESS(state, payload) {
      state.user = { ...payload, loading: false, error: null }
    },
    LOGIN_USER_ERROR(state, payload) {
      state.user = { ...state.user, loading: false, error: payload }
    },
  },
  actions: {
    login(context, userObj) {
      context.commit('LOGIN_USER_LOADING')
      axios
        .post('http://localhost:3000/api/users/login', userObj, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          context.commit('LOGIN_USER_SUCCESS', res.data)
        })
        .catch((err) => context.commit('LOGIN_USER_ERROR', err.response.data))
    },
  },
  modules: {},
})
