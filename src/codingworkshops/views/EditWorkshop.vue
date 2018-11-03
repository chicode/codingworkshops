<template lang='pug'>
.edit-workshop.standard-layout(v-if='!loading')
  h1.name {{ data.workshop.name }}

  p.error(v-if='errors.description') {{ errors.description }}
  InputWrapper(:value='data.workshop.description' @input='edit("description", $event)')
    p.description {{ data.workshop.description || 'enter an eye-catching description!' }}

  LessonTiles(:edit='true' :lessons='data.workshopLessons')
  button.button(@click='create'): div new lesson

  .new-contributor
    p.error(v-if="errors.contributors") {{ errors.contributors }}
    .row
      input.input(v-model="contributor" placeholder="username")
      button.button(@click=`edit('contributors', [
        contributor, ...contributors
      ])`): div add contributor
  p currently: {{ contributors.join(' ') }}

  .url.row
    p.error(v-if="errors.source_url") {{ errors.source_url }}
    input.input(v-model="sourceUrl" placeholder="YAML source url")
    button.button(@click=`edit('sourceUrl', sourceUrl)`)
      div save
    button.button(@click='sync')
      div sync source (warning: will overwrite!)

p(v-else) loading...
</template>

<script>
import Query from '@/components/Query'
import InputWrapper from '@/components/InputWrapper'
import LessonTiles from '../components/LessonTiles'
import { edit, create, apollo, data } from '@/edit-abstractions'
import { syncWorkshop } from '@/graphql/mutations'

export default {
  name: 'EditWorkshop',
  components: { Query, LessonTiles, InputWrapper },
  data: () => ({
    ...data(),
    contributor: '',
    sourceUrl: '',
  }),
  computed: {
    contributors () {
      return this.data.workshop.contributors.map(contributor => contributor.username)
    },
  },
  apollo: { data: apollo('WorkshopContributors') },
  methods: {
    edit: edit('Workshop'),
    create: create('Lesson', 'Workshop', {
      onSuccess: function () {
        this.$router.push({ name: 'edit-lesson',
          params: {
            ...this.$route.params,
            lesson: this.data.workshopLessons.length + 1,
          },
        })
      },
    }),
    async sync () {
      await this.$apollo.mutate(
        syncWorkshop({
          pk: this.data.workshop.id,
        })
      )

      // reset to home in case the name changes
      this.$router.push({ name: 'human', params: this.$route.params })
    },
  },
}
</script>

<style scoped lang="stylus">
.new-contributor {
  margin-top: 50px;
}
.url {
  margin-top: 50px;
}
input, button {
  margin-right: 20px;
}
.row {
  display: flex;
  align-items: flex-end;
}
</style>
