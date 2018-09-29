<template lang="pug">
.edit-lesson.standard-layout
  p.error(v-if='errors.name') {{ errors.name }}
  InputWrapper(v-model='data.lesson.name'): h1 {{ data.lesson.name || 'enter a name' }}

  p.error(v-if='errors.description') {{ errors.description }}
  InputWrapper(v-model='data.lesson.description'): p {{ data.lesson.description || 'enter a description' }}
</template>

<script>
import InstructionSlide from '../components/InstructionSlide'
import SlideFooter from '../components/SlideFooter'
import InputWrapper from '@/components/InputWrapper'

export default {
  name: 'Lesson',
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
      update: (result) => { console.log(result); return result },
    },
  },
  watch: {
    'data.lesson': {
      async handler ({ name, description }) {
        const { data: { editLesson: { ok, errors } } } = await this.$apollo.mutate(
          require('@/graphql/m/EditLesson').default(
            { name, description, pk: this.data.lesson.id }
          )
        )

        if (!ok) {
          this.errors = errors
        }
      },
      deep: true,
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
