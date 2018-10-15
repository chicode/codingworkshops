import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'
import { sync } from 'vuex-router-sync'

import routerConfig from './codingworkshops/router'
import storeConfig from './store'
import App from './codingworkshops/App.vue'

import './styles/index.styl'
import './directives.js'

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

// eslint-disable-next-line no-extend-native
String.prototype.toUnderscore = function () {
  return this.replace(/([A-Z])/g, ($1) => '_' + $1.toLowerCase())
}

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Router)
Vue.use(VueApollo)

export const store = new Vuex.Store(storeConfig)
export const router = new Router(routerConfig)
// use router/client from within vuex with this.router
// this is better than importing because it is more general ie nico can use the same implementation both as a component and separate app
Vuex.Store.prototype.router = router

sync(store, router, { moduleName: 'router' })

export const apolloClient = new ApolloClient({
  uri: `${
    process.env.NODE_ENV === 'development'
      ? 'http://127.0.0.1:8000'
      : 'https://codingworkshops.org/api'
  }/graphql/`,
  credentials: 'include',

  fetchOptions: {
    credentials: 'include',
  },
})
Vuex.Store.prototype.apolloClient = apolloClient

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app')
