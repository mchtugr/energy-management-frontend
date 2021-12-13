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
    factories: {
      loading: false,
      error: null,
      list: [],
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
    FETCH_FACTORIES_LOADING(state) {
      state.factories.loading = true
    },
    FETCH_FACTORIES_SUCCESS(state, payload) {
      state.factories = { list: payload, loading: false, error: null }
    },
    FETCH_FACTORIES_ERROR(state, payload) {
      state.factories = { ...state.factories, loading: false, error: payload }
    },
  },
  actions: {
    // login user
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

    // fetch all factories
    fetchFactoryList(context) {
      context.commit('FETCH_FACTORIES_LOADING')
      axios
        .get('http://localhost:3000/api/factories', {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          context.commit('FETCH_FACTORIES_SUCCESS', res.data.data)
        })
        .catch((err) =>
          context.commit('FETCH_FACTORIES_ERROR', err.response.data)
        )
    },
  },
  modules: {},
})
