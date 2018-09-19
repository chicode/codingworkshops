<template lang="pug">
div.footer
  div.breadcrumbs
    router-link(:to="{ name: 'home' }")
      span.accent-2 coding
      span.accent-1 workshops
    router-link.workshop(:to="{ name: 'workshop', params: { workshop: $route.params.workshop } }") {{ $route.params.workshop }}
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
.footer {
  padding: 20px;
  padding-bottom: 0;
  display: flex;
  justify-content: space-between;
}

.breadcrumbs {
  > * {
    margin-right: 20px
  }

  .workshop {
    text-decoration: underline;
  }
}

.buttons {
  display: flex;
  .button {
    margin-right: 20px;
  }
}
</style>
