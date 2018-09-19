import Vue from 'vue'
import Vuex from 'vuex'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'
import App from './nico/App.vue'
import storeConfig from './store'

import './styles/index.styl'

Vue.config.productionTip = false

Vue.use(Vuex)

export const store = new Vuex.Store(storeConfig)

export const apolloClient = new ApolloClient({
  uri: `${
    process.env.NODE_ENV === 'development'
      ? 'http://127.0.0.1:8000'
      : 'https://api.codingworkshops.org'
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
  store,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app')
