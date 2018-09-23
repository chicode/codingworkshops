import nico from '@/nico/src/store'
import codingworkshops from '@/codingworkshops/store.js'

export default {
  ...nico,
  modules: {
    ...nico.modules,
    codingworkshops,
  },
}
