<template>
  <Query
    :query="require('@/graphql/q/AllWorkshops.gql')"
  >
    <template slot-scope="{ data: { allWorkshops } }">
      <h1>coding workshops</h1>
      <ul class="workshops">
        <router-link
          v-for="{ name, description } in allWorkshops"
          :to="{ name: 'workshop', params: { name } }"
          :key="name"
          class="workshop"
          tag="li"
        >
          <h2>{{ name }}</h2>
          <p>{{ description }}</p>
        </router-link>
      </ul>
    </template>
  </Query>
</template>

<script>
import Query from '@/components/Query'

export default {
  name: 'Home',
  components: { Query },
}
</script>

<style scoped lang="stylus">
@import '~@/styles/defs.styl'

.workshops {
  display: flex;
  flex-wrap: wrap;
}

.workshop {
  tile('tile');
  background: palette.accent-1;
}
</style>
