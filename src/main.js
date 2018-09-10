import Vue from 'vue'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'

import router from './codingworkshops/router'
import App from './codingworkshops/App.vue'
import './registerServiceWorker'

Vue.config.productionTip = false

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
  provide: apolloProvider.provide(),
  render: (h) => h(App),
}).$mount('#app')
