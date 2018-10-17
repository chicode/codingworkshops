<template lang="pug">
.image-editor
  .controls.no-interaction
    ToolBar(:module='module')
    OptionBar(:module='module')
  .canvas
    MainCanvas(:module='module')
    GridCanvas(:module='module')
    OverlayCanvas(ref='canvas' :module='module')
</template>

<script>
import { mapActions } from './dynamic-helpers'
import { getCoordsFromEvent } from './helpers'

import ToolBar from './components/ToolBar'
import OptionBar from './components/OptionBar'

import GridCanvas from './components/GridCanvas'
import MainCanvas from './components/MainCanvas'
import OverlayCanvas from './components/OverlayCanvas'

export default {
  name: 'ImageEditor',

  components: {
    GridCanvas, MainCanvas, OverlayCanvas, ToolBar, OptionBar,
  },

  props: {
    module: {
      type: String,
      required: true,
    },
  },

  mounted () {
    const el = this.$refs.canvas.$el
    el.addEventListener('mousedown', (event) => this.mouseDown(getCoordsFromEvent(event)))
    el.addEventListener('mousemove', (event) => this.mouseMove(getCoordsFromEvent(event)))
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
    ...mapActions('module', ['mouseDown', 'mouseUp', 'mouseMove', 'mouseLeave']),
    ...mapActions(function () {
      return `${this.module}-history`
    }, ['undo', 'redo']),
  },
}
</script>

<style scoped lang="stylus">
@import './layered-canvas'
.controls {
  display: flex;
  align-items: center;
  margin: 10px 0;
}
</style>
