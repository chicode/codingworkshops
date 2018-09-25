<template lang="pug">
div.loading-bar
  div.bar(:style="{ width: this.progress * 100 + '%' }")
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'LoadingBar',
  data: () => ({
    progress: 0,
  }),
  computed: {
    ...mapState('nico', ['loadingTime', 'loading']),
  },
  watch: {
    loading (loading) {
      if (loading && this.loadingTime) this.init()
    },
    loadingTime (_, old) {
      this.init()
    },
  },
  methods: {
    init () {
      this.start = Date.now()
      const main = () => {
        this.progress = ((Date.now() - this.start) / 1000) / this.loadingTime
        if (this.progress < 1) window.requestAnimationFrame(main)
      }
      window.requestAnimationFrame(main)
    },
  },
}
</script>

<style scoped lang="stylus">
@import '~@/styles/defs'

.loading-bar {
  standard-border()
  background: palette.light-green;
  position: relative;
  height: 30px;
  box-sizing: content-box;
}

.bar {
  standard-border()
  background: palette.light-red;
  height: 100%;
  left: -1 * borders.standard.width;
  top: -1 * borders.standard.width;
  position: relative;
}
</style>
