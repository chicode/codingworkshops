import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'
import { sync } from 'vuex-router-sync'

import routerConfig from './codingworkshops/router'
import storeConfig from './store'
import App from './codingworkshops/App.vue'
import './registerServiceWorker'

import './styles/index.styl'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Router)
Vue.use(VueApollo)

export const store = new Vuex.Store(storeConfig)
export const router = new Router(routerConfig)

sync(store, router, { moduleName: 'router' })

console.log(process.env.NODE_ENV)
export const apolloClient = new ApolloClient({
  uri: `${
    process.env.NODE_ENV === 'development' ? 'http://127.0.0.1' : 'https://api.codingworkshops.org'
  }:8000/graphql/`,
  credentials: 'include',

  fetchOptions: {
    credentials: 'include',
  },
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app')
