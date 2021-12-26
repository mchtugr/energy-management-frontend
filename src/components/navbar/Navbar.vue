<template>
  <b-navbar
    toggleable="lg"
    variant="light"
    fixed="top"
    class="px-3"
    v-if="showNavbar"
  >
    <b-navbar-brand class="navbar__logo p-0">
      <router-link to="/">
        <img src="@/assets/faradai-logo.svg" alt="logo" />
      </router-link>
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="user.role === 'admin'">
        <b-nav-item
          ><router-link to="/dashboard/factories"
            >{{$t('Dashboard')}}</router-link
          ></b-nav-item
        >
      </b-navbar-nav>
      <b-navbar-nav class="navbar__right">
        <b-nav-item-dropdown :text="$i18n.locale.toUpperCase()" right class="dropdown-menu-end">
          <b-dropdown-item @click="$i18n.locale = 'en'">EN</b-dropdown-item>
          <b-dropdown-item @click="$i18n.locale = 'tr'">TR</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown
          :text="user.name | capitalize"
          right
          v-if="user.name"
        >
          <b-dropdown-item>{{$t('Profile')}}</b-dropdown-item>
          <b-dropdown-item @click='handleSignout'>{{$t('Sign Out')}}</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item v-else>
          <router-link to="/login">{{$t('Sign In')}}</router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import filters from '../../mixins/filters'
export default {
  name: 'Navbar',
  data(){
    return {
    langs: ['tr', 'en']
    }
  },
  computed: {
    ...mapState(['user']),
    showNavbar() {
      return this.$route.name !== 'Login' && this.$route.name !== 'Signup'
    },
  },
  methods: {
    ...mapActions(['signout']),
    handleSignout() {
      this.signout()
      this.$router.push('/login')
    }
  },
  mixins: [filters],
}
</script>

<style lang="scss" src="./navbar.scss"></style>
