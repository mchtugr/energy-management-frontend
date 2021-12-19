import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue'),
  },

  {
    path: '/dashboard/factories',
    name: 'FactoryDetails',
    component: () => import('../views/FactoryDetails.vue'),
  },
  {
    path: '/dashboard/units',
    name: 'UnitDetails',
    component: () => import('../views/UnitDetails.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  let userIsLogged = store.state.user.token
  if (to.name === 'Login' && userIsLogged) {
    // Redirect user to homepage
    return next('/')
  } else {
    // Let the user pass
    return next()
  }
})

export default router
