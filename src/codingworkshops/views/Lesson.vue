<template lang="pug">
div(v-if="slides")
  div.root(v-if="slides.length")
    InstructionSlide(@finished="slideFinished").content(:slide="slide")
    div.footer
      button.button(
        :disabled="isFirstSlide"
        @click="previousSlide"
      )
        div previous
      button.button(
        :disabled="!finished || isLastSlide"
        @click="nextSlide"
      )
        div next
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
    finished: false,
  }),
  computed: {
    isFirstSlide () {
      return !this.slideIndex
    },
    isLastSlide () {
      return this.slideIndex === this.slides.length - 1
    },
    slide () {
      console.log(this.slides, this.slideIndex)
      return this.slides[this.slideIndex]
    },
  },
  methods: {
    nextSlide () {
      this.slideIndex += 1
      console.log(this.slides, this.slideIndex)
    },
    previousSlide () {
      this.slideIndex -= 1
    },
    slideFinished () {
      this.finished = true
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
  padding: 20px;

  .button {
    margin-right: 20px;
  }
}
</style>
