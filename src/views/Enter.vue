<template>
  <div>
    <p v-if="incorrectLogin">wrong username or password</p>
    <input
      v-model="username"
      @keyup.enter="login"
    >
    <input
      v-model="password"
      type="password"
      @keyup.enter="login"
    >
    <button
      @click="login"
    >let me in!</button>
  </div>
</template>

<script>
export default {
  name: 'Enter',

  data () {
    return {
      username: '',
      password: '',
      incorrectLogin: false,
    }
  },

  methods: {
    async login () {
      const { data } = await this.$apollo.mutate({
        mutation: require('@/graphql/Login.gql'),
        variables: {
          username: this.username,
          password: this.password,
        },
      })

      if (data.loginUser.ok) {
        this.$router.push({ name: 'home' })
      } else {
        this.incorrectLogin = true
      }
    },
  },
}
</script>
