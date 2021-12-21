<template>
  <form class="signup-form bg-light" @submit.prevent="signupUser">
    <h3 class="mb-3">{{$t("Sign Up")}}</h3>
    <!-- NAME -->
    <b-row>
      <b-form-group
        :label="$t('Name')"
        label-for="name"
        :invalid-feedback="invalidName"
        :state="isValidName"
        class="mb-3 text-start"
      >
        <b-form-input
          id="name"
          v-model="name"
          :state="isValidName"
          type="text"
          trim
        ></b-form-input>
      </b-form-group>
    </b-row>
    <!-- EMAIL -->
    <b-row>
      <b-form-group
        :label="$t('Email')"
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
    <!-- PAASSWORD -->
    <b-row>
      <b-form-group
        :label="$t('Password')"
        label-for="password"
        :invalid-feedback="invalidPassword"
        :state="isValidPassword"
        class="text-start mb-3"
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
    <!-- ROLE -->
    <b-row>
      <b-form-group :label="$t('Role')" class="text-start">
        <b-form-select v-model="role" class="py-2 w-100">
          <b-form-select-option value="admin">Admin</b-form-select-option>
          <b-form-select-option value="editor">Editor</b-form-select-option>
        </b-form-select>
      </b-form-group>
    </b-row>
    <!-- SUBMIT BTN -->
    <b-button
      variant="outline-primary"
      type="submit"
      class="mt-2"
      :disabled="disabled"
    >
      <b-spinner small v-if="signup.loading"></b-spinner>
      <span v-else>{{$t("Sign Up")}}</span>
    </b-button>
    <div class="mt-3 text-left d-flex">
      <span>{{$t("Already have an account?")}}</span>
      <router-link to="/login" class="mx-2 text-primary">{{$t("Sign In")}}</router-link>
    </div>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'SignupForm',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      role: 'admin',
    }
  },
  computed: {
    ...mapState(['user', 'signup']),
    disabled() {
      if (this.name === '' || this.email === '' || this.password === '') {
        return true
      } else {
        return false
      }
    },
    isValidName() {
      if (this.name === '') return null
      return this.name.length > 3
    },
    isValidEmail() {
      if (this.email === '') return null
      return this.email.includes('@')
    },
    isValidPassword() {
      if (this.password === '') return null
      return this.password.length > 7
    },
    invalidName() {
      return 'Name should be at least 4 characters'
    },

    invalidEmail() {
      return 'Please enter a valid email'
    },
    invalidPassword() {
      return 'Password should be at least 8 characters'
    },
  },
  methods: {
    ...mapActions(['register']),
    signupUser() {
      this.register({
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role,
      })
      if (this.signup.success) {
        this.$router.push('/login')
      }
    },
  },
}
</script>

<style lang="scss">
.signup-form {
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
