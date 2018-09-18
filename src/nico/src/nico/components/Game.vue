<template lang="pug">
.game
  p.error(v-if='error') {{ error.message }}
  p(v-else-if='!hasBeenRun && !showGreeting') Press 'run code' to run your game for the first time
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

  props: {
    showGreeting: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

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
