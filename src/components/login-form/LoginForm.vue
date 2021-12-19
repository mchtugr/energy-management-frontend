<template>
  <form class="login-form bg-light" @submit.prevent="loginUser">
    <h3 class="mb-3">Sign In</h3>
    <b-row>
      <b-form-group
        label="Email"
        label-for="email"
        :invalid-feedback="invalidEmail"
        :state="isValidEmail"
        class="mb-3 text-start"
      >
        <b-form-input
          id="email"
          v-model="email"
          :state="isValidEmail"
          type="email"
          trim
        ></b-form-input>
      </b-form-group>
    </b-row>
    <b-row>
      <b-form-group
        label="Password"
        label-for="password"
        :invalid-feedback="invalidPassword"
        :state="isValidPassword"
        class="text-start"
      >
        <b-form-input
          id="password"
          v-model="password"
          :state="isValidPassword"
          type="password"
          trim
        ></b-form-input>
      </b-form-group>
    </b-row>
    <b-row>
      <b-form-checkbox
        name="remember"
        v-model="rememberUser"
        class="my-2 text-start"
      >
        <span class="mx-2">Remember Me?</span>
      </b-form-checkbox>
    </b-row>
    <div v-if="user.error" class="text-danger mt-t2 text-start">
      * {{ user.error }}
    </div>
    <div class="mt-2">
      <b-button variant="outline-primary" type="submit">
        {{ user.loading ? 'Logging in...' : 'Login' }}
        <b-spinner small v-if="user.loading"></b-spinner>
      </b-button>
    </div>
    <div class="mt-3 text-left d-flex">
      <span>Don't have an account?</span>
      <router-link to="/signup" class="mx-2 text-primary">Sign Up</router-link>
    </div>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      rememberUser: true,
    }
  },
  computed: {
    ...mapState(['user']),
    isValidEmail() {
      if (this.email === '') return null
      return this.email.includes('@')
    },
    isValidPassword() {
      if (this.password === '') return null
      return this.password.length > 7
    },

    invalidEmail() {
      return 'Please enter a valid email'
    },
    invalidPassword() {
      return 'Password should be at least 8 characters'
    },
  },
  methods: {
    ...mapActions(['login']),

    loginUser() {
      // login user action
      this.login({ email: this.email, password: this.password })
    },
  },
  updated() {
    if (this.user.token) {
      this.$router.push({ name: 'Home' }).catch((error) => {
        if (error.name != 'NavigationDuplicated') {
          throw error
        }
      })
    }
  },
}
</script>

<style lang="scss" src="./login-form.scss"></style>
