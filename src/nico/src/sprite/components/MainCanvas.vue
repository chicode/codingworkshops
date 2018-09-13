<template>
  <canvas
    ref="main"
    :style="{ padding: $options.CANVAS_PADDING + $options.CANVAS_PADDING_OUTER + 'px' }"
  />
</template>

<script>
import { mapState } from 'vuex'
import { initCanvas, initCtx, clearCtx, getCanvasFromData } from '../helpers'
import { CANVAS_PADDING, CANVAS_PADDING_OUTER } from '../constants'

export default {
  name: 'MainCanvas',

  CANVAS_PADDING,
  CANVAS_PADDING_OUTER,

  computed: {
    ...mapState('sprite/sprite', ['spritesheet']),
  },

  watch: {
    spritesheet () {
      this.updateCanvas()
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
      let canvas = getCanvasFromData(this.spritesheet)
      clearCtx(this.mainCtx)
      this.mainCtx.drawImage(canvas, 0, 0)
    },
  },
}
</script>
