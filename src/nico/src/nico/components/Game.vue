<template lang="pug">
.game
  p.error(v-if='error') {{ error.message }}
  greeting(v-else-if='!hasBeenRun')
  // v-show has to be used because the ref needs to be initiated
  canvas.main-canvas(v-show='running', ref='mainCanvas')
</template>

<script>
import { mapMutations, mapState } from 'vuex'

import { initCtx, initCanvas } from '../../sprite/helpers'

import Greeting from './Greeting'

export default {
  name: 'Game',

  components: { Greeting },

  computed: {
    ...mapState('nico', ['error', 'hasBeenRun', 'running']),
  },

  mounted () {
    const canvas = this.$refs.mainCanvas
    initCanvas(canvas)
    const mainCtx = canvas.getContext('2d')
    initCtx(mainCtx)
    this.initMainCtx(mainCtx)
  },

  methods: {
    ...mapMutations('nico', ['initMainCtx']),
  },
}
</script>

<style scoped lang="stylus">
@import '../../styles/defs.styl'

.game {
  .main-canvas {
    standard-border()
  }
}
</style>
