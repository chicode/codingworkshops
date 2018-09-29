<template lang="pug">
ApolloMutation(:mutation='mutation' :variables='variables' @done='({ data }) => onDone(data)')
  template(slot-scope='{ mutate, loading, error }')
    div(v-if='loading') Loading...
    div(v-else-if='error') An error occured
    slot(v-else='' :mutate='mutate')
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
