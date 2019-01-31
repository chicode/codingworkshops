<template lang="pug">
.full.d-flex.flex-column(v-if="!$rest.loading && $rest.project.ok")
  Nico.full.p-5(:show-greeting="false" language="Python" :script-boilerplate="false")
  div.p-4.d-flex.justify-content-between.border-light.bt-only(style="height: 70px;")
    div
      router-link.mr-green(:to="{ name: 'home' }")
        span.text-blue coding
        span.text-purple workshops
    div.d-flex.align-items-start.mt-1
      button.button.mr-3(
        @click="save"
      ): div save
      button.button(
        @click="publish"
      ): div publish

div(v-else-if="$rest.loading")
  p loading

div(v-else)
  p 404
</template>

<script>
import Nico from '@/nico/src/nico/App'

export default {
  name: 'Project',
  components: { Nico },
  rest: {
    project () {
      return ['userProject', this.$route.params]
    },
  },
  methods: {
    save () {},
    publish () {},
  },
}
</script>

<style lang="scss">
body,
html {
  height: 100%;
}
</style>
