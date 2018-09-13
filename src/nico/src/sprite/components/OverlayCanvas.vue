<template lang="pug">
canvas(
  ref="overlay"
  :style="{ padding: $options.CANVAS_PADDING_OUTER + 'px' }"
)
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { initCanvas, clearCtx, scale } from '../helpers'
import { SELECTION_WIDTH, SELECTION_COLOR, SELECTION_DASH, CANVAS_PADDING, CANVAS_PADDING_OUTER } from '../constants'

export default {
  name: 'OverlayCanvas',

  CANVAS_PADDING_OUTER,

  computed: {
    ...mapState('sprite/select', ['selectStart', 'selectSize']),
    ...mapState('sprite', ['tool']),
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
    initCanvas(el, CANVAS_PADDING)
    this.overlayCtx = el.getContext('2d')
    // account for canvas being too large due to canvas padding
    this.overlayCtx.translate(CANVAS_PADDING, CANVAS_PADDING)
    this.overlayCtx.setLineDash(SELECTION_DASH)
    this.overlayCtx.strokeStyle = SELECTION_COLOR
    this.overlayCtx.lineWidth = SELECTION_WIDTH
  },

  methods: {
    ...mapMutations('sprite/select', ['setSelectSize']),
    drawSelect (x, y) {
      clearCtx(this.overlayCtx)
      if (this.tool === 'rectangle-select') {
        this.overlayCtx.strokeRect(...scale(this.selectStart[0], this.selectStart[1], this.selectSize[0], this.selectSize[1]))
      } else {
        this.overlayCtx.beginPath()
        this.overlayCtx.ellipse(...scale(this.selectStart[0], this.selectStart[1], this.selectSize[0], this.selectSize[1]), 0, 0, Math.PI * 2)
        this.overlayCtx.stroke()
      }
    },
  },
}
</script>
