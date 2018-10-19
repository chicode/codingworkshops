<template lang="pug">
.full.lesson
    EditInstructionSlide.content
    EditSlideFooter(:isFirstSlide='isFirstSlide' :isLastSlide='isLastSlide').footer
</template>

<script>
import EditInstructionSlide from '../components/EditInstructionSlide'
import EditSlideFooter from '../components/EditSlideFooter'

export default {
  name: 'EditSlide',
  components: {
    EditInstructionSlide, EditSlideFooter,
  },
  data: () => ({
    data: [],
  }),
  apollo: {
    data: {
      query: require('@/graphql/q/LessonSlides_minimal.gql'),
      variables () {
        return this.$route.params
      },
      update: (result) => result.lessonSlides,
    },
  },
  computed: {
    isFirstSlide () {
      return parseInt(this.$route.params.slide) === 1
    },
    isLastSlide () {
      return parseInt(this.$route.params.slide) === this.data.length
    },
  },
}
</script>

<style scoped lang="stylus">
.lesson {
  display: flex;
  flex-direction: column;
}
</style>
