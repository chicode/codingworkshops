import historyPlugin from '../image-editor/store/history-plugin'
import sprite from '../image-editor/store'

import { CANVAS_SIZE } from '../image-editor/constants'

export const history = historyPlugin(['sprite', 'sprite'], (store) => {
  // hacky fix to save spritesheet without mutation
  window.localStorage.setItem('spritesheet', store.state.sprite.sprite.spritesheet)
  window.lastCoords = [null, null]
})

export default {
  ...sprite('sprite', CANVAS_SIZE),
}
