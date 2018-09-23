<template lang="pug">
.human
  query(:query="require('@/graphql/q/User.gql')" :variables="{ username: $route.params.human }")
    template(slot-scope='{ data: { user: { username, bio, workshopSet } } }')
      h1.no-margin {{ username }}
      p {{ bio }}
      h2 Workshops
      WorkshopTiles.tiles(:workshops="workshopSet")
      button.button: div(@click="enterEditMode") new workshop
</template>

<script>
import { mapActions } from 'vuex'

import Query from '@/components/Query'
import WorkshopTiles from '../components/WorkshopTiles.vue'

export default {
  name: 'Human',
  components: { Query, WorkshopTiles },
  methods: { ...mapActions('codingworkshops', ['enterEditMode']) },
}
</script>

<style scoped lang="stylus">
@import '~@/styles/defs'

.human {
  standard-layout()
}
</style>
