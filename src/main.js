import Vue from 'vue'
import Vuex from 'vuex'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'

import router from './codingworkshops/router'
import storeConfig from './store'
import App from './codingworkshops/App.vue'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(Vuex)

const apolloClient = new ApolloClient({
  uri: 'http://127.0.0.1:8000/graphql/',
  credentials: 'include',

  fetchOptions: {
    credentials: 'include',
  },
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

new Vue({
  router,
  store: new Vuex.Store(storeConfig),
  provide: apolloProvider.provide(),
  render: (h) => h(App),
}).$mount('#app')
