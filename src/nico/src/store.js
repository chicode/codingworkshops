import nico from './nico/store'
import sprite, { history } from './sprite/store'

export default {
  modules: {
    nico,
    sprite,
  },
  plugins: [history],
}
