import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

import store from '@/store/index';

Vue.use(VueRouter)

const router =   new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/connexion',
      name: 'Login',
      meta: {layout: 'empty'},
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/inscription',
      name: 'Register',
      meta: {layout: 'empty'},
      component: () => import('@/views/Register.vue')
    },
    {
      path: '/',
      name: 'Home',
      meta: {layout: 'main', auth: true},
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: {layout: 'main', auth: true},
      component: () => import('@/views/Profile.vue')
    },
    {
      path: '/form-transfert',
      name: 'FormTransfert',
      meta: {layout: 'main', auth: true},
      component: () => import('@/views/FormTransfert.vue')
    },
    {
      path: '/erreur',
      name: 'Erreur',
      meta: {layout: 'main', auth: true},
      component: () => import('@/views/Erreur.vue')
    },
    {
      path: '*',
      meta: {layout: 'main' || 'empty', auth: true || false},
      redirect: '/erreur'
    },
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    store.dispatch('setSnackbar', {text: "Vous devez d\'abord vous connecter", color: 'red'});
    next('/connexion')
  } else {
    next()
  }

})

export default router
