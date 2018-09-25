<template lang='pug'>
.edit-workshop.standard-layout
  h1.name {{ data.name }}
  p.error(v-if='errors.description') {{ errors.description }}
  InputWrapper(v-model='data.description'): p.description {{ data.description || 'enter an eye-catching description!' }}
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
    },
    errors: {},
  }),
  apollo: {
    data: {
      query: require('@/graphql/q/Workshop.gql'),
      variables () {
        return {
          workshop: this.$route.params.workshop,
          human: this.$route.params.human,
        }
      },
      update: (result) => result.workshop,
    },
  },
  watch: {
    data: {
      async handler ({ description, name }) {
        const { data: { editWorkshop: { ok, errors } } } = await this.$apollo.mutate({
          mutation: require('@/graphql/m/EditWorkshop.gql'),
          variables: { description, name, pkName: this.$route.params.workshop },
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
