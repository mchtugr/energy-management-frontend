<template>
  <div class="login-page">
    <b-col lg="4" md="6" sm="8" cols="10" class="mx-auto">
      <login-form />
    </b-col>
  </div>
</template>

<script>
import LoginForm from '../components/login-form/LoginForm.vue'
export default {
  components: { LoginForm },
  name: 'Login',
}
</script>

<style lang="scss">
.login-page {
  display: flex;
  align-items: center;
  width: 100vw;
  height: 80vh;
  margin: auto;
}
</style>
