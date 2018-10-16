import historyPlugin from '../image-editor/store/history-plugin'
import sprite from '../image-editor/store'

export const history = historyPlugin(['tile', 'sprite'], (store) => {
  // hacky fix to save spritesheet without mutation
  window.localStorage.setItem('tilesheet', store.state.sprite.sprite.spritesheet)
  window.lastCoords = [null, null]
})

export default {
  ...sprite('tile'),
}
