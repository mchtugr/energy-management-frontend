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
      get: { loading: false, error: null, list: [] },
      edit: { loading: false, error: null },
      delete: { loading: false, error: null },
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
      state.factories.get.loading = true
    },
    FETCH_FACTORIES_SUCCESS(state, payload) {
      state.factories.get = {
        list: payload,
        loading: false,
        error: null,
      }
    },
    FETCH_FACTORIES_ERROR(state, payload) {
      state.factories.get = {
        ...state.factories.get,
        loading: false,
        error: payload,
      }
    },
    DELETE_FACTORY_LOADING(state) {
      state.factories.delete.loading = true
    },
    DELETE_FACTORY_SUCCESS(state) {
      state.factories.delete = { loading: false, error: null }
    },
    DELETE_FACTORY_ERROR(state, payload) {
      state.factories.delete = { loading: false, error: payload }
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

    // remove selected factory
    removeFactory(context, id) {
      context.commit('DELETE_FACTORY_LOADING')

      axios
        .delete(`http://localhost:3000/api/factories/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(() => {
          context.commit('DELETE_FACTORY_SUCCESS')
        })
        .catch((err) =>
          context.commit('DELETE_FACTORY_ERROR', err.response.data)
        )
    },
  },
  modules: {},
})
