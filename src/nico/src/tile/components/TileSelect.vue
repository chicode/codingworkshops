<template lang="pug">
canvas(ref="main")
</template>

<script>
import { mapState } from 'vuex'
import { initCanvas, initCtx, clearCtx, getCanvasFromData } from '../../image-editor/helpers'

export default {
  name: 'MainCanvas',

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
