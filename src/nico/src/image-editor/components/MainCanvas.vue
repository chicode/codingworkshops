<template lang="pug">
canvas(
  ref="main"
  :style="{ padding: $options.CANVAS_PADDING + $options.CANVAS_PADDING_OUTER + 'px' }"
)
</template>

<script>
import { mapState, mapGetters } from '../dynamic-helpers'
import { mapState as mapStateOrig } from 'vuex'
import { initCanvas, initCtx, clearCtx, getCanvasFromData } from '../helpers'
import { CANVAS_PADDING, CANVAS_PADDING_OUTER } from '../constants'

export default {
  name: 'MainCanvas',

  CANVAS_PADDING,
  CANVAS_PADDING_OUTER,

  props: {
    module: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapState('module', ['spritesheet'], ['sprite']),
    ...mapStateOrig('nico', ['view']),
    ...mapGetters('module', ['spritesheetDisplay'], ['sprite']),
  },

  watch: {
    spritesheet () {
      this.updateCanvas()
    },
    view () {
      if (this.module === 'tile' && this.view === 'tile') {
        this.updateCanvas()
      }
    },
  },

  mounted () {
    const el = this.$refs.main
    initCanvas(el)
    this.main = el
    this.mainCtx = el.getContext('2d')
    initCtx(this.mainCtx)

    this.updateCanvas()
  },

  methods: {
    updateCanvas () {
      let canvas = getCanvasFromData(this.spritesheetDisplay())
      clearCtx(this.mainCtx)
      this.mainCtx.drawImage(canvas, 0, 0)
    },
  },
}
</script>
