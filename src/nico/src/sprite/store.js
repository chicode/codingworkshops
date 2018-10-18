import _ from 'lodash'

import historyPlugin from '../image-editor/store/history-plugin'
import sprite from '../image-editor/store'

import { CANVAS_SIZE } from '../image-editor/constants'

export const history = historyPlugin(['sprite', 'sprite'], (store) => {
  // hacky fix to save spritesheet without mutation
  window.localStorage.setItem('spritesheet', store.state.sprite.sprite.spritesheet)
  window.lastCoords = [null, null]
})

export default _.merge(sprite('sprite', CANVAS_SIZE), {
  modules: {
    sprite: {
      actions: {
        handleAction (context, payload) {
          sprite('sprite', CANVAS_SIZE).modules.sprite.actions.handleAction(context, payload)
          // updates the tilesheet component by forcing an update on the watcher
          // by setting the value to a new list through slice
          // TODO fix this performance-killing hack
          context.commit(
            'tile/sprite/setSpritesheet',
            context.rootState.tile.sprite.spritesheet.slice(),
            {
              root: true,
            },
          )
        },
      },
    },
  },
})
