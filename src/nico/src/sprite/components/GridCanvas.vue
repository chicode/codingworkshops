<template lang="pug">
canvas(
  ref="grid"
  :style="{ padding: $options.CANVAS_PADDING_OUTER + 'px' }"
)
</template>

<script>
import { initCanvas } from '../helpers'
import { GRID_SIZE, GRID_WIDTH, GRID_COLOR, GRID_FONT, GRID_NUMBER, SCALE, CANVAS_SIZE, CANVAS_PADDING, CANVAS_PADDING_OUTER } from '../constants'

export default {
  name: 'GridCanvas',

  CANVAS_PADDING_OUTER,

  mounted () {
    const el = this.$refs.grid
    initCanvas(el, CANVAS_PADDING)

    let ctx = el.getContext('2d')
    // account for canvas being too large due to canvas padding
    ctx.translate(CANVAS_PADDING, CANVAS_PADDING)

    ctx.beginPath()
    ctx.strokeStyle = GRID_COLOR
    ctx.fillStyle = GRID_COLOR
    ctx.font = GRID_FONT
    ctx.lineWidth = GRID_WIDTH
    let begin, end
    for (let x = 0; x <= GRID_NUMBER; x++) {
      begin = [x * GRID_SIZE * SCALE, 0]
      end = [x * GRID_SIZE * SCALE, CANVAS_SIZE * SCALE]
      ctx.moveTo(begin[0], begin[1])
      ctx.lineTo(end[0], end[1])
    }
    for (let y = 0; y <= GRID_NUMBER; y++) {
      begin = [0, y * GRID_SIZE * SCALE]
      end = [CANVAS_SIZE * SCALE, y * GRID_SIZE * SCALE]
      ctx.moveTo(begin[0], begin[1])
      ctx.lineTo(end[0], end[1])
    }
    for (let x = 0; x <= GRID_NUMBER; x++) {
      for (let y = 0; y <= GRID_NUMBER; y++) {
        ctx.fillText(x + GRID_NUMBER * y, x * GRID_SIZE * SCALE + 4, y * GRID_SIZE * SCALE + 12)
      }
    }
    ctx.stroke()
  },
}
</script>
