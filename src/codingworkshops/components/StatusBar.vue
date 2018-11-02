<template lang="pug">
.status-bar
  router-link(:to="{ name: 'home' }")
    span.accent-2 coding
    span.accent-1 workshops
  div(v-if="!loading")
    div.profile(v-if='data.currentUser')
      router-link(:to="{ name: 'human', params: { human: data.currentUser.username } }") {{ data.currentUser.username }}
      button(@click='logout') logout
    div(v-else='')
      router-link(:to="{ name: 'enter' }") login
</template>

<script>
import Query from '@/components/Query'
import { CurrentUser_minimal } from '@/graphql/schema.gql'
import { logout } from '@/graphql/mutations'
import { apollo } from '@/edit-abstractions'

export default {
  name: 'StatusBar',

  components: { Query },

  data: () => ({ loading: 0 }),
  apollo: { data: apollo('CurrentUser_minimal') },

  methods: {
    async logout () {
      await this.$apollo.mutate(logout())
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
