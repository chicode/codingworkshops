<template lang='pug'>
.edit-workshop.standard-layout(v-if='!loading')
  h1.name {{ data.workshop.name }}
  p.error(v-if='errors.description') {{ errors.description }}

  InputWrapper(:value='data.workshop.description' @input='edit("description")($event)')
    p.description {{ data.workshop.description || 'enter an eye-catching description!' }}

  LessonTiles(:edit='true' :lessons='data.workshopLessons')
  .button(@click='create'): div new lesson
p(v-else) loading...
</template>

<script>
import Query from '@/components/Query'
import InputWrapper from '@/components/InputWrapper'
import LessonTiles from '../components/LessonTiles'
import { edit, create, apollo, data } from '@/edit-abstractions'

export default {
  name: 'EditWorkshop',
  components: { Query, LessonTiles, InputWrapper },
  data: () => ({
    ...data(),
    data: {
      workshop: {
        name: '',
        description: '',
        id: '',
      },
      workshopLessons: [],
    },
  }),
  ...apollo('workshop'),
  methods: {
    ...edit('workshop'),
    ...create('lesson', 'workshop', {
      onSuccess: function () {
        this.$router.push({ name: 'edit-lesson',
          params: {
            ...this.$route.params,
            lesson: this.data.workshopLessons.length + 1,
          },
        })
      },
    }),
  },
}
</script>
