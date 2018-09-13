import Vue from 'vue'
import App from './nico/App.vue'
import store from './store'

Vue.config.productionTip = false

window.store = store

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app')
