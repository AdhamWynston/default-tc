// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE

require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import Vuex from 'vuex'
import VuexStore from './vuex/store'
import moment from 'moment'
import VueResource from 'vue-resource'
import JwtToken from './services/jwt-token'
import Vuelidate from 'vuelidate'
import './services/imports'

Vue.config.productionTip = false
Vue.use(Quasar) // Install Quasar Framework
Vue.use(Vuex)
Vue.use(VueResource)
Vue.http.options.root = process.env.SERVER
Vue.http.options.emulateJSON = true
Vue.use(Vuelidate, {
  locale: 'pt_BR'
})
const store = new Vuex.Store(VuexStore)

Vue.http.interceptors.push((request, next) => {
  if (JwtToken.token) {
    request.headers.set('Authorization', JwtToken.getAuthorizationHeader())
  }
  next()
})

Vue.http.interceptors.push((request, next) => {
  next((response) => {
    let authorization = response.headers.get('Authorization')
    if (authorization) {
      JwtToken.token = authorization.split(' ')[1]
    }
    if (response.status === 401) {
      store.commit('unauthenticated')
      return router.push('/login')
    }
    else if (response.status === 403) {
      store.commit('unauthenticated')
      return router.push('/login')
    }
  })
})
router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.state.auth.check) {
    return router.push('/login')
  }
  next()
})
router.beforeEach((to, from, next) => {
  if (store.state.auth.check) {
    if (store.getters.isCoordinator && to.name.startsWith('admin')) {
      return router.push('/home')
    }
  }
  next()
})

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
moment.locale('pt-BR')
import 'quasar-extras/material-icons'
import 'quasar-extras/ionicons'
import 'quasar-extras/fontawesome'

/* eslint-disable no-new */
new Vue({
  el: '#q-app',
  router,
  store,
  render: h => h(require('./App').default)
})
