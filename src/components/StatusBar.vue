<template>
  <div class="root">
    <div>
      <router-link :to="{ name: 'home' }">Home</router-link>
    </div>
    <Query
      :query="require('@/graphql/CurrentUser_minimal.gql')"
      fetch-policy="network-only"
    >
      <template slot-scope="{ data: { username }}">
        <div v-if="username">
          <router-link :to="{ name: 'human', params: { username } }">{{ username }}</router-link>
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
}
</script>

<style scoped lang="stylus">
.root {
  display: flex;
  justify-content: space-between;
}
</style>
