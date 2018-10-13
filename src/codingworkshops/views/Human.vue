<template lang="pug">
.human
  query(:query="require('@/graphql/q/User.gql')" :variables="{ human: $route.params.human }")
    template(slot-scope='{ data: { user: { username, bio }, userWorkshops } }')
      h1.no-margin {{ username }}
      p {{ bio }}
      h2 Workshops
      WorkshopTiles(:edit='true' :center='false').workshops(:workshops="userWorkshops")

      .new-workshop
        p.error(v-if="errors.name") {{ errors.name }}
        input.input(v-model="workshop" placeholder="name")
        button.button(@click="newWorkshop"): div new workshop
</template>

<script>
import { mapActions } from 'vuex'

import Query from '@/components/Query'
import WorkshopTiles from '../components/WorkshopTiles.vue'
import { convertErrors } from '@/edit-abstractions'

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
      const { data: { createWorkshop: { ok, errors } } } = await this.$apollo.mutate(
        require('@/graphql/m/CreateWorkshop').default(
          { name: this.workshop },
          this.$route.params
        )
      )
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

.new-workshop {
  display: flex;
  margin-top: 50px;
  align-items: flex-end;
  .input {
    margin-right: 10px;
  }
}
</style>
