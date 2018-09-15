<template lang="pug">
  .root
    .controls.no-interaction
      ToolBar
      OptionBar
    .canvas
      MainCanvas
      GridCanvas
      OverlayCanvas(ref='canvas')
</template>

<script>
import { mapActions } from 'vuex'
import { SCALE, CANVAS_PADDING, CANVAS_PADDING_OUTER } from './constants'

import ToolBar from './components/ToolBar'
import OptionBar from './components/OptionBar'

import GridCanvas from './components/GridCanvas'
import MainCanvas from './components/MainCanvas'
import OverlayCanvas from './components/OverlayCanvas'

export default {
  name: 'Sprite',

  components: {
    GridCanvas, MainCanvas, OverlayCanvas, ToolBar, OptionBar,
  },

  mounted () {
    const el = this.$refs.canvas.$el
    const f = this.getCoordsFromEvent
    el.addEventListener('mousedown', (event) => this.mouseDown(f(event)))
    el.addEventListener('mousemove', (event) => this.mouseMove(f(event)))
    el.addEventListener('mouseup', this.mouseUp)
    el.addEventListener('mouseleave', this.mouseLeave)

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Control') window.control = true

      else if (event.key === 'Z' && window.control) this.redo()
      else if (event.key === 'z' && window.control) this.undo()
    })

    document.addEventListener('keyup', (event) => {
      if (event.key === 'Control') window.control = false
    })
  },

  methods: {
    ...mapActions('sprite', ['mouseDown', 'mouseUp', 'mouseMove', 'mouseLeave']),
    ...mapActions('history', ['undo', 'redo']),

    getCoordsFromEvent (event) {
      return [
        event.offsetX - CANVAS_PADDING_OUTER - CANVAS_PADDING,
        event.offsetY - CANVAS_PADDING_OUTER - CANVAS_PADDING,
      ].map(coord => Math.floor(coord / SCALE))
    },
  },
}
</script>

<style scoped lang="stylus">
.root {
  canvas {
    // TODO: compute this number automatically
    margin-top: -824px;

    position: relative;

    image-rendering: optimizeSpeed; // Older versions of FF
    image-rendering: -moz-crisp-edges; // FF 6.0+ image-rendering:
    -webkit-optimize-contrast; // Webkit // (Safari now, Chrome soon)
    image-rendering: -o-crisp-edges; // OS X & Windows Opera (12.02+)
    image-rendering: optimize-contrast; // Possible future browsers.
    -ms-interpolation-mode: nearest-neighbor; // IE
  }
  canvas:first-of-type {
    margin: 0;
  }

}
.controls {
  display: flex;
  align-items: center;
  margin: 10px 0;
}
.canvas {
  // the canvases are stracked vertically rather than horizontally so that
  // aligning them horizontally is possible
  display: flex;
  flex-direction: column;
  align-items: center;

  // fix incorrect mouse detection on firefox
  box-sizing: content-box;
}
</style>
