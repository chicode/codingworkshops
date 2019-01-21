<template lang="pug">
div.full
  status-bar.mb-6(v-if="!$router.currentRoute.meta.noStatusBar")
  router-view
</template>

<script>
import StatusBar from './components/StatusBar'

export default {
  name: 'App',
  components: { StatusBar },
}
</script>
