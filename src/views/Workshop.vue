<template>
  <Query
    :query="require('@/graphql/Workshop.gql')"
    :variables="{ name: $route.params.name }"
  >
    <template slot-scope="{ data: { workshop: { name, description } } }">
      <h1>{{ name }}</h1>
      <p>{{ description }}</p>
    </template>
  </Query>
</template>

<script>
import Query from '@/components/Query'

export default {
  name: 'Workshop',
  components: { Query },
  mounted () {
    console.log(this.$route)
  },
}
</script>
