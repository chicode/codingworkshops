<template lang="pug">
canvas(
  ref="overlay"
)
</template>

<script>
import { mapState } from 'vuex'
import { initCanvas, clearCtx, scale } from '../../image-editor/helpers'
import { SELECTION_WIDTH, SELECTION_COLOR, SELECTION_DASH, CANVAS_PADDING, CANVAS_PADDING_OUTER, GRID_SIZE, SCALE } from '../../image-editor/constants'

export default {
  name: 'TileSelectOverlayCanvas',

  CANVAS_PADDING_OUTER,

  computed: {
    ...mapState('tile/tileSelect', ['selectStart', 'selectSize']),
  },

  watch: {
    selectStart () {
      this.drawSelect()
    },
    selectSize () {
      this.drawSelect()
    },
  },

  mounted () {
    const el = this.$refs.overlay
    initCanvas(el)
    this.overlayCtx = el.getContext('2d')
    this.overlayCtx.setLineDash(SELECTION_DASH)
    this.overlayCtx.strokeStyle = SELECTION_COLOR
    this.overlayCtx.lineWidth = SELECTION_WIDTH
  },

  methods: {
    drawSelect (x, y) {
      clearCtx(this.overlayCtx)
      const transform = (n) => Math.floor(n / (GRID_SIZE * SCALE)) * (GRID_SIZE * SCALE)
      this.overlayCtx.strokeRect(transform(this.selectStart[0]), transform(this.selectStart[1]), this.selectSize[0] * SCALE, this.selectSize[1] * SCALE)
    },
  },
}
</script>
