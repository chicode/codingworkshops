import Vue from 'vue'
import Vuex from 'vuex'
import App from './nico/App.vue'
import storeConfig from './store'
import './styles/index.styl'

Vue.config.productionTip = false

Vue.use(Vuex)

new Vue({
  store: new Vuex.Store(storeConfig),
  render: (h) => h(App),
}).$mount('#app')
