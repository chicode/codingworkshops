<template>
  <Mutation
    :mutation="require('@/graphql/Login.gql')"
    :on-done="onLogin"
    :variables="{ username, password }"
  >
    <template slot-scope="{ mutate }">
      <p v-if="incorrectLogin">wrong username or password</p>
      <input v-model="username">
      <input
        v-model="password"
        type="password"
      >
      <button
        @click="mutate()"
        @keyup.enter="mutate()"
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
        this.$router.push({ name: 'home' })
      } else {
        this.incorrectLogin = true
      }
    },
  },
}
</script>
