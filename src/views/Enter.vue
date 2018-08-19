<template>
  <Mutation
    :mutation="require('@/graphql/Login.gql')"
    :on-done="onLogin"
    :variables="{ username, password }"
  >
    <template slot-scope="{ mutate }">
      <p v-if="incorrectLogin">wrong username or password</p>
      <input
        v-model="username"
        @keyup.enter="mutate()"
      >
      <input
        v-model="password"
        type="password"
        @keyup.enter="mutate()"
      >
      <button
        @click="mutate()"
      >let me in!</button>
    </template>
  </Mutation>
</template>

<script>
import Mutation from '@/components/Mutation'

export default {
  name: 'Enter',
  components: { Mutation },
  data () {
    return {
      username: '',
      password: '',
      incorrectLogin: false,
    }
  },
  methods: {
    onLogin ({ loginUser: { ok } }) {
      if (ok) {
        this.$apolloProvider.defaultClient.query({
          query: require('@/graphql/CurrentUser_minimal.gql'),
          fetchPolicy: 'network-only',
        }).then((result) => console.log(result.data))
      } else {
        this.incorrectLogin = true
      }
    },
  },
}
</script>
