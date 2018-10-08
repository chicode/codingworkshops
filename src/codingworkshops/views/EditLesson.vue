<template lang="pug">
.edit-lesson.standard-layout
  div(v-if='!loading')
    p.error(v-if='errors.name') {{ errors.name }}
    InputWrapper(:value='data.lesson.name' @input='value => onEdit("name", value)'): h1 {{ data.lesson.name }}

    p.error(v-if='errors.description') {{ errors.description }}
    InputWrapper(:value='data.lesson.description' @input='value => onEdit("description", value)' :markdown='true'): p {{ data.lesson.description || 'enter a description' }}

    SlideTiles(:edit='true' :slides='data.lessonSlides')
    .button(@click='newSlide'): div new slide
  p(v-else) loading...
</template>

<script>
import InstructionSlide from '../components/InstructionSlide'
import SlideTiles from '../components/SlideTiles'
import InputWrapper from '@/components/InputWrapper'
import { convertErrors } from '@/helpers'

export default {
  name: 'EditLesson',
  components: { InstructionSlide, SlideTiles, InputWrapper },
  data: () => ({
    data: {
      lesson: {
        name: '',
        description: '',
        id: '',
      },
      lessonSlides: [],
    },
    loading: 0,
    errors: {},
  }),
  apollo: {
    data: {
      loadingKey: 'loading',
      query: require('@/graphql/q/Lesson.gql'),
      variables () {
        return this.$route.params
      },
      update: (result) => result,
    },
  },
  methods: {
    async onEdit (property, value) {
      const { data: { editLesson: { ok, errors } } } = await this.$apollo.mutate(
        require('@/graphql/m/EditLesson').default(
          { [property]: value, pk: this.data.lesson.id }
        )
      )

      if (!ok) {
        this.errors = convertErrors(errors)
      } else {
        this.data.lesson[property] = value
        this.errors = []
      }
    },
    async newSlide () {
      const { data: { createSlide: { ok, errors } } } = await this.$apollo.mutate(
        require('@/graphql/m/CreateSlide.js').default(
          { lesson: this.data.lesson.id },
          this.$route.params
        )
      )
      if (!ok) console.error(errors)
      else {
        this.$router.push({ name: 'edit-slide',
          params: {
            ...this.$route.params,
            slide: this.data.lessonSlides.length + 1,
          },
        })
      }
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
