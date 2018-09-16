<template lang="pug">
div.footer
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

  .button {
    margin-right: 20px;
  }
}
</style>
