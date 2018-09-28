<template lang='pug'>
.edit-workshop.standard-layout
  h1.name {{ data.name }}
  p.error(v-if='errors.description') {{ errors.description }}
  InputWrapper(v-model='data.description'): p.description {{ data.description || 'enter an eye-catching description!' }}
  LessonTiles(:edit='true' :lessons='data.lessonSet')
  .button(@click='newLesson'): div new lesson
</template>

<script>
import Query from '@/components/Query'
import InputWrapper from '@/components/InputWrapper'
import LessonTiles from '../components/LessonTiles'

export default {
  name: 'EditWorkshop',
  components: { Query, LessonTiles, InputWrapper },
  data: () => ({
    data: {
      name: '',
      description: '',
      lessonSet: [],
    },
    errors: {},
  }),
  watch: {
    data: {
      async handler ({ description }) {
        const { data: { editWorkshop: { ok, errors } } } = await this.$apollo.mutate({
          mutation: require('@/graphql/m/EditWorkshop.gql'),
          variables: { description, pk: this.data.id },
          fetchPolicy: 'no-cache',
        })

        if (!ok) {
          this.errors = errors
        }
      },
      deep: true,
    },
  },
  methods: {
    async newLesson () {
      await this.$apollo.mutate({
        mutation: require('@/graphql/m/CreateLesson.gql'),
        variables: { index: this.data.lessonSet.length, workshop: this.data.id },
        fetchPolicy: 'no-cache',
      })
      this.$router.push({ name: 'edit-lesson',
        params: {
          ...this.$route.params,
          lesson: this.data.lessonSet.length,
        },
      })
    },
  },
  apollo: {
    data: {
      query: require('@/graphql/q/Workshop.gql'),
      variables () {
        return this.$route.params
      },
      update: (result) => result.workshop,
    },
  },
}
</script>
