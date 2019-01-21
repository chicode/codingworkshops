<template lang="pug">
.enter
  p.error(v-if='error') {{ error }}
  input.input(v-model='data.username', placeholder='username')
  input.input(v-model='data.password', placeholder='password', type='password', @keyup.enter='login')
  .buttons
    button.button(@click='login'): div login
    router-link.link(:to="{ name: 'signup' }"): div sign up
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

      const { ok, error, jwt, user } = await this.$methods.login({ session: this.data })

      if (ok) {
        window.localStorage.setItem('jwt', jwt)
        window.localStorage.setItem('id', user.id)
        this.$router.push({ name: 'home' })
      } else {
        this.error = error
      }
    },
  },
}
</script>

<style scoped lang="stylus">
@import '~@/styles/defs';

.enter {
  width: 300px;
  margin: auto;
  margin-top: 200px;
}

.input {
  margin-bottom: 10px;
}

.buttons {
  display: flex;
  margin-top: 30px;
  > * {
    margin-right: 10px;
  }
}
</style>
