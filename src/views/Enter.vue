<template>
  <div>
    <p
      v-if="error"
      class="error"
    >{{ error }}</p>
    <input
      v-model="data.username"
      placeholder="username"
    >
    <input
      v-model="data.password"
      placeholder="password"
      type="password"
      @keyup.enter="login"
    >
    <button
      @click="login"
    >login</button>
    <router-link :to="{ name: 'signup' }">sign up</router-link>
  </div>
</template>

<script>
export default {
  name: 'Enter',

  data () {
    return {
      data: {
        username: '',
        password: '',
      },
      error: '',
    }
  },

  methods: {
    async login () {
      if (!this.data.username || !this.data.password) {
        this.error = 'please enter some data'
        return
      }

      const { data: { loginUser: { ok } } } = await this.$apollo.mutate({
        mutation: require('@/graphql/m/Login.gql'),
        variables: this.data,
      })

      if (ok) {
        this.$router.push({ name: 'home' })
      } else {
        this.error = 'wrong username or password'
      }
    },
  },
}
</script>
