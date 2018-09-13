<template lang="pug">
div
  status-bar(v-if="!$router.currentRoute.meta.noStatusBar")
  router-view
</template>

<script>
import StatusBar from './components/StatusBar'

export default {
  name: 'App',
  components: { StatusBar },
}
</script>
