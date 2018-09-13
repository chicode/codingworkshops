<template lang="pug">
.root
  div
    router-link(:to="{ name: 'home' }") Home
  query(:query="require('@/graphql/q/CurrentUser_minimal.gql')", fetch-policy='network-only')
    template(slot-scope='{ data: { currentUser } }')
      div(v-if='currentUser')
        router-link(:to="{ name: 'human', params: { username: currentUser.username } }")
          | {{ currentUser.username }}
        button(@click='logout') logout
      div(v-else='')
        router-link(:to="{ name: 'enter' }") login
</template>

<script>
import Query from '@/components/Query'

export default {
  components: { Query },

  methods: {
    async logout () {
      await this.$apollo.mutate({
        mutation: require('@/graphql/m/Logout.gql'),
      })
      this.$router.push({ name: 'home' })
    },
  },
}
</script>

<style scoped lang="stylus">
.root {
  display: flex;
  justify-content: space-between;
}
</style>
