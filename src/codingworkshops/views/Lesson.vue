<template lang="pug">
div(v-if="slides")
  div.root(v-if="slides.length")
    InstructionSlide.content(:slide="slides[slideIndex]")
    div.footer
      button(
        :disabled="isFirstSlide"
        @click="nextSlide"
      ) previous
      button(
        :disabled="isLastSlide"
        @click="previousSlide"
      ) next
  div(v-else) no slides!

div(v-else)
  p loading
</template>

<script>
import Query from '@/components/Query'
import InstructionSlide from '../components/InstructionSlide'

export default {
  name: 'Lesson',
  components: { Query, InstructionSlide },
  data: () => ({
    slideIndex: 0,
    slides: null,
  }),
  computed: {
    isFirstSlide () {
      return !this.slideIndex
    },
    isLastSlide () {
      return this.slideIndex === this.slides.length - 1
    },
  },
  methods: {
    nextSlide () {
      this.slideIndex += 1
    },
    previousSlide () {
      this.slideIndex -= 1
    },
  },
  apollo: {
    slides: {
      query: require('@/graphql/q/Lesson_slides.gql'),
      variables () {
        const { lesson, workshop } = this.$route.params
        return { lesson, workshop }
      },
      update: data => data.lesson.slideSet,
    },
  },
}
</script>

<style scoped lang="stylus">
.content {
  height: 90vh;
}

.footer {
  height: 10vh;
}
</style>
