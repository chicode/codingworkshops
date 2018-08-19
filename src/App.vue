<template>
  <div>
    <status-bar v-if="!$router.currentRoute.meta.noStatusBar" />
    <router-view />
  </div>
</template>

<script>
import StatusBar from '@/components/StatusBar'

export default {
  name: 'App',
  components: { StatusBar },
}
</script>

<style lang="stylus">
@import '~@/styles/index.styl'
</style>
