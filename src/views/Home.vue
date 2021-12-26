<template>
  <div class="home pt-5">
    <b-jumbotron :header="$t('Welcome to Faradai Dashboard')" :lead="$t('You can select & see details of your factories and units')" class="mt-4">
    <p>{{$t('For more information visit dashboard')}}</p>
    <b-button variant="primary" @click="$router.push('/dashboard/factories')">{{$t('Dashboard')}}</b-button>
  </b-jumbotron>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
}
</script>
