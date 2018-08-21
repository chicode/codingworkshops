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
@import url('https://fonts.googleapis.com/css?family=Comfortaa:400,700|Karla:400,700')
@import '~@/styles/index.styl'
</style>
