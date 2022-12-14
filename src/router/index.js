import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthRequired from "../utils/AuthRequired";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'App',
    beforeEnter: AuthRequired,
    component: () => import(/* webpackChunkName: "dashboard-app" */ '../pages'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '../pages/Dashboard.vue'),
        meta: {
          title: 'Dashboard - MSI',
        }
      },
      {
        path: 'saldo/:type/:noanggota?',
        name: 'Saldo',
        component: () => import(/* webpackChunkName: "Saldo" */ '../pages/Saldo.vue'),
        meta: {
          title: 'Saldo - MSI',
        }
      },
      {
        path: 'anggota/:rembug?/:anggota?',
        name: 'Anggota',
        component: () => import(/* webpackChunkName: "anggota" */ '../pages/Anggota.vue'),
        meta: {
          title: 'Anggota - MSI',
        }
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../pages/Login.vue'),
    meta: {
      title: 'Login - MSI',
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
