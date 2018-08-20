<template>
  <ApolloQuery
    :query="query"
    :variables="variables"
    :fetch-policy="fetchPolicy"
  >
    <template slot-scope="{ result: { loading, error, data } }">
      <div v-if="loading">Loading...</div>

      <div v-else-if="error">An error occured</div>

      <slot
        v-else-if="data"
        :data="data"
      />
    </template>
  </ApolloQuery>
</template>

<script>
export default {
  name: 'Query',
  props: {
    query: {
      type: Object,
      required: true,
    },
    variables: {
      type: Object,
      default: () => ({}),
    },
    fetchPolicy: {
      type: String,
      default: 'cache-first',
    },
  },
}
</script>
