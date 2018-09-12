<template>
  <div
    v-if="slides"
  >
    <div v-if="slides.length">
      <InstructionSlide :slide="slides[slideIndex]" />
      <div>
        <button
          :disabled="isFirstSlide"
          @click="nextSlide"
        >previous</button>
        <button
          :disabled="isLastSlide"
          @click="previousSlide"
        >next</button>
      </div>
    </div>
    <div v-else>
      no slides!
    </div>
  </div>
  <div v-else>
    <p>loading</p>
  </div>
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
</style>
