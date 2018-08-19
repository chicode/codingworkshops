<template>
  <div>
    <status-bar v-if="!$router.currentRoute.meta.noStatusBar" />
    <router-view />
  </div>
</template>
<style lang="stylus">
@import '~@/styles/index.styl'

<script>
import StatusBar from '@/components/StatusBar'

export default {
  components: { StatusBar },
}
</script>

<style lang="stylus">
@import '~@/styles/index.styl'
</style>
