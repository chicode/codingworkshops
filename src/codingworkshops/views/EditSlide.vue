<template lang="pug">
.full.lesson
    EditInstructionSlide.content
    EditSlideFooter(:isFirstSlide='isFirstSlide' :isLastSlide='isLastSlide' :create='create' :lesson='data.lesson').footer
</template>

<script>
import EditInstructionSlide from '../components/EditInstructionSlide'
import EditSlideFooter from '../components/EditSlideFooter'
import { create } from '@/edit-abstractions'
import { LessonSlides_minimal } from '@/graphql/schema.gql'

export default {
  name: 'EditSlide',
  components: {
    EditInstructionSlide, EditSlideFooter,
  },
  data: () => ({
    data: {

      lessonSlides: [],
      lesson: {},
    },
  }),
  apollo: {
    data: {
      query: LessonSlides_minimal,
      variables () {
        return this.$route.params
      },
      update: (result) => result,
    },
  },
  computed: {
    isFirstSlide () {
      return parseInt(this.$route.params.slide) === 1
    },
    isLastSlide () {
      return parseInt(this.$route.params.slide) === this.data.lessonSlides.length
    },
  },
  methods: {
    create: create('slide', null, {
      onSuccess () {
        this.$router.push({ name: 'edit-slide',
          params: {
            ...this.$route.params,
            slide: parseInt(this.$route.params.slide) + 1,
          },
        })
      },
      getVars () {
        return {
          lesson: this.data.lesson.id,
          index: parseInt(this.$route.params.slide) + 1,
        }
      },
    }),
  },
}
</script>

<style scoped lang="stylus">
.lesson {
  display: flex;
  flex-direction: column;
}
</style>
