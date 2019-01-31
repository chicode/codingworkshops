<template lang="pug">
div.p-4.d-flex.justify-content-between(style="height: 70px;")
  div
    router-link.mr-3(:to="{ name: 'home' }")
      span.text-blue coding
      span.text-purple workshops
    router-link.underline(:to=`{
      name: 'workshop',
      params: {
        user: $route.params.user,
        workshop: $route.params.workshop,
      }
    }`) {{ $route.params.workshop }}
  div.d-flex.align-items-start.mt-1
    button.button.mr-6(
      @click="exportProject"
    ): div export project
    button.button.mr-3(
      :disabled="isFirstSlide"
      @click="previousSlide"
    ): div previous
    button.button(
      :disabled="!isSlideDone"
      @click="nextSlide"
    ): div {{ isLastSlide ? 'finish' : 'next' }}
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SlideFooter',
  computed: {
    ...mapGetters('codingworkshops', ['isSlideDone', 'isLastSlide', 'isFirstSlide']),
  },
  methods: {
    ...mapActions('codingworkshops', ['previousSlide', 'nextSlide', 'exportProject']),
  },
}
</script>

<style lang="scss">
body,
html {
  height: 100%;
}
</style>
