import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'

import prepare from './rest'

import routerConfig from './codingworkshops/router'
import storeConfig from './store'
import App from './codingworkshops/App.vue'

import './styles/index.styl'
import './directives'
import './lodash'
import './globals'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Router)

export const store = new Vuex.Store(storeConfig)
export const router = new Router(routerConfig)
// use router/client from within vuex with this.router
// this is better than importing because it is more general ie nico can use the same implementation both as a component and separate app
Vuex.Store.prototype.router = router

sync(store, router, { moduleName: 'router' })

const { methods, install } = prepare({
  root: `${
    process.env.NODE_ENV === 'development'
      ? 'http://127.0.0.1:4000'
      : 'https://codingworkshops.org/api'
  }/api/v1`,
  endpoints: {
    GET: {
      users: '/users',
      user: '/users/:user',
      workshops: '/workshops',
      workshop: '/workshops/:workshop',
      lesson: '/workshops/:workshop/:lesson',
    },
    POST: {
      me: '/users/me',
      createUser: '/users',
      createWorkshop: '/workshops',
      login: '/sessions',
      loadWorkshop: '/workshops/:workshop/load',
    },
    PATCH: {
      updateWorkshop: '/workshops/:workshop',
    },
    DELETE: {
      deleteWorkshop: '/workshops/:workshop',
    },
  },
  prepareBody (body, { method }) {
    if (method !== 'GET') {
      return { ...body, jwt: localStorage.getItem('jwt') }
    }
    return body
  },
  processResult (result, { res }) {
    result.ok = res.status === 200
    return result
  },
})

Vue.use(install)
Vuex.Store.prototype.$methods = methods

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
