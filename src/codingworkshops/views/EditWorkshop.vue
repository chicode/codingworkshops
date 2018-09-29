<template lang='pug'>
.edit-workshop.standard-layout
  h1.name {{ data.workshop.name }}
  p.error(v-if='errors.description') {{ errors.description }}
  InputWrapper(:value='data.workshop.description' @input='value => onEdit("description", value)'): p.description {{ data.workshop.description || 'enter an eye-catching description!' }}
  LessonTiles(:edit='true' :lessons='data.workshopLessons')
  .button(@click='newLesson'): div new lesson
</template>

<script>
import Query from '@/components/Query'
import InputWrapper from '@/components/InputWrapper'
import LessonTiles from '../components/LessonTiles'
import { convertErrors } from '@/helpers'

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
  methods: {
    async onEdit (property, value) {
      const { data: { editWorkshop: { ok, errors } } } = await this.$apollo.mutate(
        require('@/graphql/m/EditWorkshop').default(
          { [property]: value, pk: this.data.workshop.id }
        )
      )

      if (!ok) {
        this.errors = convertErrors(errors)
      } else {
        this.data.workshop[property] = value
      }
    },
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
      query: require('@/graphql/q/Workshop.gql'),
      variables () {
        return this.$route.params
      },
      update: (data) => data,
    },
  },
}
</script>
