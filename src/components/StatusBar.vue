<template>
  <div class="root">
    <div>
      <router-link :to="{ name: 'home' }">Home</router-link>
    </div>
    <Query
      :query="require('@/graphql/CurrentUser_minimal.gql')"
      fetch-policy="network-only"
    >
      <template slot-scope="{ data: { currentUser } }">
        <div v-if="currentUser">
          <router-link :to="{ name: 'human', params: { username: currentUser.username } }">
            {{ currentUser.username }}
          </router-link>
          <button @click="logout">logout</button>
        </div>
        <div v-else>
          <router-link :to="{ name: 'enter' }">login</router-link>
        </div>
      </template>
    </Query>
  </div>
</template>

<script>
import Query from '@/components/Query'

export default {
  components: { Query },

  methods: {
    async logout () {
      await this.$apollo.mutate({
        mutation: require('@/graphql/Logout.gql'),
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
