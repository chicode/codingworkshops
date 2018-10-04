<template lang="pug">
.edit-lesson.standard-layout p.error(v-if='errors.name') {{ errors.name }} InputWrapper(:value='data.lesson.name' @input='value => onEdit("name", value)'): h1 {{ data.lesson.name }}

  p.error(v-if='errors.description') {{ errors.description }}
  InputWrapper(:value='data.lesson.description' @input='value => onEdit("description", value)' :markdown='true'): p {{ data.lesson.description || 'enter a description' }}
</template>

<script>
import InstructionSlide from '../components/InstructionSlide'
import SlideFooter from '../components/SlideFooter'
import InputWrapper from '@/components/InputWrapper'
import { convertErrors } from '@/helpers'

export default {
  name: 'EditLesson',
  components: { InstructionSlide, SlideFooter, InputWrapper },
  data: () => ({
    data: {
      lesson: {
        name: '',
        description: '',
        id: '',
      },
      lessonSlides: [],
    },
    errors: {},
  }),
  apollo: {
    data: {
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
