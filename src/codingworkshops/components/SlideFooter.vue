<template lang="pug">
div.footer
  div.breadcrumbs
    router-link(:to="{ name: 'home' }")
      span.accent-2 coding
      span.accent-1 workshops
    router-link.workshop(:to=`{
      name: 'workshop',
      params: {
        human: $route.params.human,
        workshop: $route.params.workshop,
      }
    }`) {{ $route.params.workshop }}
  div.buttons
    button.button(
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
    ...mapActions('codingworkshops', ['previousSlide', 'nextSlide']),
  },
}

</script>

<style scoped lang="stylus">
@import './SlideFooter'
</style>
