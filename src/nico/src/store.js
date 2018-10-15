import nico from './nico/store'
import sprite, { history as spriteHistory } from './sprite/store'
import tile, { history as tileHistory } from './tile/store'

export default {
  modules: {
    nico,
    sprite,
    tile,
  },
  plugins: [spriteHistory, tileHistory],
}
