import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      loading: false,
      name: JSON.parse(window.localStorage.getItem('user'))?.name,
      role: JSON.parse(window.localStorage.getItem('user'))?.role,
      token: JSON.parse(window.localStorage.getItem('user'))?.token ,
      error: null,
    },
    signup: {
      loading: false,
      error: null,
      success: null,
    },
    factories: {
      list: [],
      get: { loading: false, error: null },
      edit: { loading: false, error: null },
      delete: { loading: false, error: null },
      new: { loading: false, error: null },
    },
    units: {
      list: [],
      get: { loading: false, error: null },
      edit: { loading: false, error: null },
      new: { loading: false, error: null },
    },
  },
  mutations: {
    // LOGIN
    LOGIN_USER_LOADING(state) {
      state.user.loading = true
    },
    LOGIN_USER_SUCCESS(state, payload) {
      state.user = { ...payload, loading: false, error: null }
      localStorage.setItem('user', JSON.stringify(payload))
    },
    LOGIN_USER_ERROR(state, payload) {
      state.user = { ...state.user, loading: false, error: payload }
    },

    // SIGNUP
    SIGNUP_USER_LOADING(state) {
      state.signup.loading = true
    },
    SIGNUP_USER_SUCCESS(state) {
      state.signup = { loading: false, error: null, success: true }
    },
    SIGNUP_USER_ERROR(state, payload) {
      state.signup = { loading: false, error: payload }
    },

    // SIGNOUT
    SIGNOUT(state) {
      state.user.name = null
      state.user.role = null
      state.user.token = null
      localStorage.removeItem('user')
    },

    // FETCH ALL FACTORIES
    FETCH_FACTORIES_LOADING(state) {
      state.factories.get.loading = true
    },
    FETCH_FACTORIES_SUCCESS(state, payload) {
      state.factories.get = {
        loading: false,
        error: null,
      }
      state.factories.list = payload
    },
    FETCH_FACTORIES_ERROR(state, payload) {
      state.factories.get = {
        ...state.factories.get,
        loading: false,
        error: payload,
      }
    },

    // DELETE TARGET FACTORY
    DELETE_FACTORY_LOADING(state) {
      state.factories.delete.loading = true
    },
    DELETE_FACTORY_SUCCESS(state, payload) {
      // remove target factory from state
      state.factories.list = state.factories.list.filter(
        (i) => i.id !== payload
      )
      state.factories.delete = { loading: false, error: null }
    },
    DELETE_FACTORY_ERROR(state, payload) {
      state.factories.delete = { loading: false, error: payload }
    },

    // EDIT TARGET FACTORY
    EDIT_FACTORY_LOADING(state) {
      state.factories.edit.loading = true
    },
    EDIT_FACTORY_SUCCESS(state) {
      state.factories.edit = { loading: false, error: null }
    },
    EDIT_FACTORY_ERROR(state, payload) {
      state.factories.edit = { loading: false, error: payload }
    },

    // ADD NEW FACTORY
    ADD_FACTORY_LOADING(state) {
      state.factories.new.loading = true
    },
    ADD_FACTORY_SUCCESS(state, paylaod) {
      state.factories.list = [...state.factories.list, paylaod]
      state.factories.new = { loading: false, error: null }
    },
    ADD_FACTORY_ERROR(state, payload) {
      state.factories.new = { loading: false, error: payload }
    },

    // FETCH ALL UNITS IN A FACTORY
    FETCH_UNITS_LOADING(state) {
      state.units.get.loading = true
    },
    FETCH_UNITS_SUCCESS(state, payload) {
      state.units.list = payload
      state.units.get = {
        loading: false,
        error: null,
      }
    },
    FETCH_UNITS_ERROR(state, payload) {
      state.units.get = {
        ...state.units.get,
        loading: false,
        error: payload,
      }
    },

    // DELETE A UNIT
    DELETE_UNIT_LOADING(state) {
      state.factories.delete.loading = true
    },
    DELETE_UNIT_SUCCESS(state, payload) {
      // remove target factory from state
      state.units.list = state.units.list.filter((i) => i.id !== payload)
      state.factories.delete = { loading: false, error: null }
    },
    DELETE_UNIT_ERROR(state, payload) {
      state.factories.delete = { loading: false, error: payload }
    },

    // EDIT TARGET UNIT
    EDIT_UNIT_LOADING(state) {
      state.units.edit.loading = true
    },
    EDIT_UNIT_SUCCESS(state) {
      state.units.edit = { loading: false, error: null }
    },
    EDIT_UNIT_ERROR(state, payload) {
      state.units.edit = { loading: false, error: payload }
    },

    // ADD NEW UNIT
    ADD_UNIT_LOADING(state) {
      state.units.new.loading = true
    },
    ADD_UNIT_SUCCESS(state, paylaod) {
      state.units.list = [...state.units.list, paylaod]
      state.units.new = { loading: false, error: null }
    },
    ADD_UNIT_ERROR(state, payload) {
      state.units.new = { loading: false, error: payload }
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

    // signup user
    register(context, userObj) {
      context.commit('SIGNUP_USER_LOADING')
      axios
        .post('http://localhost:3000/api/users', userObj, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          context.commit('SIGNUP_USER_SUCCESS', res.data)
        })
        .catch((err) => context.commit('SIGNUP_USER_ERROR', err.response.data))
    },

    // signout user 
    signout({commit}) {
      commit('SIGNOUT')
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
          context.commit('DELETE_FACTORY_SUCCESS', id)
        })
        .catch((err) =>
          context.commit('DELETE_FACTORY_ERROR', err.response.data)
        )
    },

    // edit factory
    editFactory(context, factoryObj) {
      context.commit('EDIT_FACTORY_LOADING')

      axios
        .patch(
          `http://localhost:3000/api/factories/${factoryObj.id}`,
          factoryObj,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then(() => {
          context.commit('EDIT_FACTORY_SUCCESS', factoryObj.id)
        })
        .catch((err) => context.commit('EDIT_FACTORY_ERROR', err.response.data))
    },
    addNewFactory(context, factoryObj) {
      context.commit('ADD_FACTORY_LOADING')

      axios
        .post('http://localhost:3000/api/factories', factoryObj, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(() => {
          context.commit('ADD_FACTORY_SUCCESS', factoryObj)
        })
        .catch((err) => context.commit('ADD_FACTORY_ERROR', err.response.data))
    },
    fetchUnitList(context, factory_id) {
      context.commit('FETCH_UNITS_LOADING')
      axios
        .get(`http://localhost:3000/api/factories/${factory_id}/units`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          context.commit('FETCH_UNITS_SUCCESS', res.data.data)
        })
        .catch((err) => context.commit('FETCH_UNITS_ERROR', err.response.data))
    },

    // remove selected unit
    removeUnit(context, { factory_id, unit_id }) {
      context.commit('DELETE_UNIT_LOADING')

      axios
        .delete(
          `http://localhost:3000/api/factories/${factory_id}/units/${unit_id}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then(() => {
          context.commit('DELETE_UNIT_SUCCESS', unit_id)
        })
        .catch((err) => context.commit('DELETE_UNIT_ERROR', err.response.data))
    },
    // edit factory
    editUnit(context, unitObj) {
      context.commit('EDIT_FACTORY_LOADING')

      axios
        .patch(
          `http://localhost:3000/api/factories/${unitObj.factory_id}/units/${unitObj.id}`,
          unitObj,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then(() => {
          context.commit('EDIT_FACTORY_SUCCESS', unitObj.id)
        })
        .catch((err) => context.commit('EDIT_FACTORY_ERROR', err.response.data))
    },
    addNewUnit(context, unitObj) {
      context.commit('ADD_UNIT_LOADING')

      axios
        .post(
          `http://localhost:3000/api/factories/${unitObj.factory_id}/units`,
          unitObj,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then(() => {
          context.commit('ADD_UNIT_SUCCESS', unitObj)
        })
        .catch((err) => context.commit('ADD_UNIT_ERROR', err.response.data))
    },
  },
  modules: {},
})
