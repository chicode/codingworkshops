<template>
  <ApolloMutation
    :mutation="mutation"
    :variables="variables"
    @done="({ data }) => onDone(data)"
  >
    <template slot-scope="{ mutate, loading, error }">
      <div v-if="loading">Loading...</div>

      <div v-else-if="error">An error occured</div>

      <slot
        v-else
        :mutate="mutate"
      />
    </template>
  </ApolloMutation>
</template>

<script>
export default {
  name: 'Mutation',
  props: {
    mutation: {
      type: Object,
      required: true,
    },
    variables: {
      type: Object,
      default: () => ({}),
    },
    onDone: {
      type: Function,
      default: () => {},
    },
  },
}
</script>
