import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'
import './registerServiceWorker'

Vue.config.productionTip = false

const apolloClient = new ApolloClient({
  uri: 'http://127.0.0.1:8000/graphql/',
  credentials: 'include',

  fetch: (uri, options) => {
    console.log(options)
    return fetch(uri, options)
  },

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
  store,
  provide: apolloProvider.provide(),
  render: (h) => h(App),
}).$mount('#app')
