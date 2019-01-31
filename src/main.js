import _ from 'lodash/fp'
import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'

import prepareRest from './rest'
import prepareAuth from './auth'

import routerConfig from './codingworkshops/router'
import storeConfig from './store'
import restConfig from './endpoints'
import App from './codingworkshops/App.vue'

import './styles/index.scss'
import './directives'
import './globals'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Router)

export const store = new Vuex.Store(storeConfig)
export const router = new Router(routerConfig)
// use router/client from within vuex with this.$router
// this is better than importing because it is more general ie nico can use the same implementation both as a component and separate app
Vuex.Store.prototype.$router = router

sync(store, router, { moduleName: 'router' })

const { methods, install: installRest } = prepareRest(
  _.merge(
    {
      root: `${
        process.env.NODE_ENV === 'development'
          ? 'http://127.0.0.1:4000'
          : 'https://codingworkshops.org/api'
      }/api/v1`,
    },
    restConfig,
  ),
)
installRest(Vue, Vuex)

const { install: installAuth } = prepareAuth(methods)
installAuth(Vue, Vuex)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
