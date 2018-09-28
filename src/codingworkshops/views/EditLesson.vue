<template lang="pug">
.edit-lesson.standard-layout
  p.error(v-if='errors.name') {{ errors.name }}
  InputWrapper(v-model='data.name'): h1 {{ data.name || 'enter a name' }}

  p.error(v-if='errors.description') {{ errors.description }}
  InputWrapper(v-model='data.description'): p {{ data.description || 'enter a description' }}
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
      name: '',
      description: '',
      slideSet: [],
    },
    errors: {},
  }),
  apollo: {
    data: {
      query: require('@/graphql/q/Lesson.gql'),
      variables () {
        return this.$route.params
      },
      update: (result) => result.lesson,
    },
  },
  watch: {
    data: {
      async handler ({ name, description }) {
        const { data: { editLesson: { ok, errors } } } = await this.$apollo.mutate({
          mutation: require('@/graphql/m/EditLesson.gql'),
          variables: { name, description, pk: this.data.id },
          fetchPolicy: 'no-cache',
        })

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
