<template lang='pug'>
.edit-workshop.standard-layout(v-if='!loading')
  h1.name {{ data.workshop.name }}
  p.error(v-if='errors.description') {{ errors.description }}

  InputWrapper(:value='data.workshop.description' @input='edit("description")($event)')
    p.description {{ data.workshop.description || 'enter an eye-catching description!' }}

  LessonTiles(:edit='true' :lessons='data.workshopLessons')
  button.button(@click='create'): div new lesson

  .new-contributor
    p.error(v-if="errors.contributors") {{ errors.contributors }}
    .row
      input.input(v-model="contributor" placeholder="username")
      button.button(@click=`edit('contributors')([
        contributor, ...contributors
      ])`): div add contributor
  p currently: {{ contributors.join(' ') }}

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
    contributor: '',
  }),
  computed: {
    contributors () {
      return this.data.workshop.contributors.map(contributor => contributor.username)
    },
  },
  ...apollo('workshopContributors'),
  methods: {
    edit: edit('workshop'),
    create: create('lesson', 'workshop', {
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

<style scoped lang="stylus">
.new-contributor {
  margin-top: 50px;
  .row {
    display: flex;
    align-items: flex-end;
  }
  input {
    margin-right: 20px;
  }
}
</style>
