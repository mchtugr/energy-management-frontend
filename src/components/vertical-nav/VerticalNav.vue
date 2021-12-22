<template>
  <b-nav vertical class="vertical-nav">
    <b-nav-item to="/dashboard/factories" exact exact-active-class="active">
      {{$t('Factory List')}}
    </b-nav-item>
    <b-nav-item to="/dashboard/units" exact exact-active-class="active">
      {{$t('Factory Units')}}
    </b-nav-item>
  </b-nav>
</template>

<script>
export default {
  name: 'VerticalNav',
}
</script>

<style lang="scss"></style>
