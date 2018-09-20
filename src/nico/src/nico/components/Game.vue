<template lang="pug">
.game
  div.errors(v-if='errors.length')
    p.error(v-for='error in errors') {{ error.message }}
  loading-bar(v-else-if='loading')
  p(v-else-if='!hasBeenRun && !showGreeting') Press 'run code' to run your game for the first time
  greeting(v-else-if='!hasBeenRun') // v-show has to be used because the ref needs to be initiated
  canvas.main-canvas(v-show='running', ref='mainCanvas')
  div.warnings(v-if='warnings.length')
    p.warning(v-for='warning in warnings') {{ warning.message }}
</template>

<script>
import { mapMutations, mapState } from 'vuex'

import { initCtx, initCanvas } from '../../sprite/helpers'

import Greeting from './Greeting'
import LoadingBar from './LoadingBar'

export default {
  name: 'Game',

  components: { Greeting, LoadingBar },

  props: {
    showGreeting: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  computed: {
    ...mapState('nico', ['errors', 'warnings', 'hasBeenRun', 'running', 'loading', 'loadingTime']),
  },

  mounted () {
    const canvas = this.$refs.mainCanvas
    initCanvas(canvas)
    const mainCtx = canvas.getContext('2d')
    initCtx(mainCtx)
    this.setMainCtx(mainCtx)
  },

  methods: {
    ...mapMutations('nico', ['setMainCtx']),
  },
}
</script>

<style scoped lang="stylus">
@import '../../styles/defs.styl'

.game {
  .main-canvas {
    standard-border()
  }
  .error, .warning {
    margin-bottom: 20px;
  }
  .error {
    color: colors.warning;
  }
  .warning {
    color: palette.blue;
  }
}
</style>
