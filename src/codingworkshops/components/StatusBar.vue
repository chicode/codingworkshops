<template lang="pug">
.status-bar
  router-link(:to="{ name: 'home' }")
    span.accent-2 coding
    span.accent-1 workshops
  query(:query="require('@/graphql/q/CurrentUser_minimal.gql')", fetch-policy='network-only')
    template(slot-scope='{ data: { currentUser } }')
      div.profile(v-if='currentUser')
        router-link(:to="{ name: 'human', params: { human: currentUser.username } }") {{ currentUser.username }}
        button(@click='logout') logout
      div(v-else='')
        router-link(:to="{ name: 'enter' }") login
</template>

<script>
import Query from '@/components/Query'

export default {
  name: 'StatusBar',

  components: { Query },

  methods: {
    async logout () {
      await this.$apollo.mutate(require('@/graphql/m/Logout').default())
      this.$router.push({ name: 'home' })
    },
  },
}
</script>

<style scoped lang="stylus">
.status-bar {
  display: flex;
  justify-content: space-between;
  padding: 40px;
}
.profile {
  display: flex;
  > * {
    margin-right: 10px;
  }
}
</style>
