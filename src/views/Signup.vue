<template>
  <div class="signup-page">
    <b-col lg="4" md="6" sm="8" cols="10" class="mx-auto">
      <signup-form />
    </b-col>
  </div>
</template>

<script>
import SignupForm from '../components/signup-form/SignupForm.vue'
export default {
  components: { SignupForm },
  name: 'Login',
}
</script>

<style lang="scss">
.signup-page {
  display: flex;
  align-items: center;
  width: 100vw;
  height: 80vh;
  margin: auto;
}
</style>
