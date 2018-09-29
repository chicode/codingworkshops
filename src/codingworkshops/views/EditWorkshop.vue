<template lang='pug'>
.edit-workshop.standard-layout
  h1.name {{ data.workshop.name }}
  p.error(v-if='errors.description') {{ errors.description }}
  InputWrapper(v-model='data.workshop.description'): p.description {{ data.workshop.description || 'enter an eye-catching description!' }}
  LessonTiles(:edit='true' :lessons='data.workshopLessons')
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
      workshop: {
        name: '',
        description: '',
        id: '',
      },
      workshopLessons: [],
    },
    errors: {},
  }),
  watch: {
    'data.workshop': {
      async handler ({ description }) {
        const { data: { editWorkshop: { ok, errors } } } = await this.$apollo.mutate(
          require('@/graphql/m/EditWorkshop').default(
            { description, pk: this.data.workshop.id }
          )
        )

        if (!ok) {
          this.errors = errors
        }
      },
      deep: true,
    },
  },
  methods: {
    async newLesson () {
      const { data: { createLesson: { ok, errors } } } = await this.$apollo.mutate(
        require('@/graphql/m/CreateLesson.js').default(
          { workshop: this.data.workshop.id },
          this.$route.params
        )
      )
      if (!ok) console.error(errors)
      else {
        this.$router.push({ name: 'edit-lesson',
          params: {
            ...this.$route.params,
            lesson: this.data.workshopLessons.length + 1,
          },
        })
      }
    },
  },
  apollo: {
    data: {
      query: require('@/graphql/q/WorkshopFull.gql'),
      variables () {
        return this.$route.params
      },
      update: (data) => data,
    },
  },
}
</script>
