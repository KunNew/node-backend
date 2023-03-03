import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import user from './custom/user'
import guest from './custom/guest'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../layouts/MainApp.vue') ,
    children: [
      { path: '/', redirect: { name: 'home' } },
      {
          path: '/dashboard',
          name: 'home',
          component: () => import('../views/Dashboard.vue')
      },
      ...user,
      


  ],
  meta: {
    requiresAuth: true,
  },
  },
  {
    path: '/',
    component: () => import('../views/auth/Login.vue'),
    children: [
        ...guest,
    ],
    meta: {
      requiresAuth: false,
    },
}
]

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'active',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const guestRoute = ['login', 'register', 'forget', 'password.reset']
  if (store.state.auth.authenticated) {
      if (guestRoute.includes(to.name)) next({ name: 'home' })
      else next()
  } else {
      if (guestRoute.includes(to.name) || to.name == 'farm.monitoring') next()
      else next({ name: 'login',query: { redirect: to.fullPath }  })
  }
})



export default router
