<template>
  <form class="login-form bg-light" @submit="loginUser">
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
    <b-row class="mb-3">
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
    <div>
      <b-button variant="primary" type="submit">Login</b-button>
    </div>
  </form>
</template>

<script>
import validators from '../../mixins/validators'
export default {
  name: 'LoginForm',
  mixins: [validators],
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
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
    loginUser() {
      this.$v.$touch()
      if (!this.$v.user.$invalid) {
        // login user action
      }
    },
  },
}
</script>

<style lang="scss" src="./login-form.scss"></style>
