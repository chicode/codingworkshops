import Vue from 'vue'
import Vuex from 'vuex'

import nico from './nico/store'
import sprite, { history } from './sprite/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    nico,
    sprite,
  },
  plugins: [history],
})
