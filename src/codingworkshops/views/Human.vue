<template lang="pug">
.human
  query(:query="require('@/graphql/q/User.gql')" :variables="{ username: $route.params.human }")
    template(slot-scope='{ data: { user: { username, bio, workshopSet } } }')
      h1.no-margin {{ username }}
      p {{ bio }}
      h2 Workshops
      WorkshopTiles.tiles(:workshops="workshopSet")

      .new-workshop
        p.error(v-if="errors.name") {{ errors.name }}
        input.input(v-model="workshop" placeholder="name")
        button.button: div(@click="newWorkshop") new workshop
</template>

<script>
import { mapActions } from 'vuex'

import Query from '@/components/Query'
import WorkshopTiles from '../components/WorkshopTiles.vue'
import { convertErrors } from '@/helpers'

export default {
  name: 'Human',
  components: { Query, WorkshopTiles },
  data: function () {
    return {
      workshop: '',
      errors: '',
    }
  },
  methods: {
    ...mapActions('codingworkshops', ['enterEditMode']),
    async newWorkshop () {
      const { data: { createWorkshop: { ok, errors } } } = await this.$apollo.mutate({
        mutation: require('@/graphql/m/CreateWorkshop.gql'),
        variables: {
          name: this.workshop,
        },
      })
      if (ok) {
        this.enterEditMode(this.workshop)
      } else {
        this.errors = convertErrors(errors)
      }
    },
  },
}
</script>

<style scoped lang="stylus">
@import '~@/styles/defs'

.human {
  standard-layout()
}

.tiles {
  justify-content: flex-start;
  margin-top: 10px;
}

.new-workshop {
  display: flex;
  margin-top: 50px;
  .input {
    margin-right: 10px;
  }
}
</style>
