<template>
  <ApolloQuery
    :query="query"
    :variables="variables"
  >
    <template slot-scope="{ result: { loading, error, data } }">
      <div v-if="loading">Loading...</div>

      <div v-else-if="error">An error occured</div>

      <slot v-else-if="data" :data="data"></slot>
    </template>
  </ApolloQuery>
</template>

<script>
export default {
  name: 'query',
  props: {
    query: Object,
    variables: Object,
  },
}
</script>
