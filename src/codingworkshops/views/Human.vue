<template lang="pug">
.human
  query(:query="require('@/graphql/q/User.gql')" :variables="{ username: $route.params.username }")
    template(slot-scope='{ data: { user: { username, bio, workshopSet } } }')
      h1 {{ username }}
      p {{ bio }}
      h2 Workshops
      WorkshopTiles.tiles(:workshops="workshopSet")
</template>

<script>
import Query from '@/components/Query'
import WorkshopTiles from '../components/WorkshopTiles.vue'

export default {
  name: 'Human',
  components: { Query, WorkshopTiles },
}
</script>

<style scoped lang="stylus">
@import '~@/styles/defs'

.human {
  standard-layout()
}
</style>
