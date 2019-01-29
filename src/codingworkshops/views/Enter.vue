<template lang="pug">
div.mx-auto(style="width: 300px;")
  p.error(v-if='error') {{ error }}
  input.input.mb-1(v-model='data.username', placeholder='username')
  input.input(v-model='data.password', placeholder='password', type='password', @keyup.enter='login')
  .d-flex.mt-4
    button.button.mr-3(@click='login'): div login
    router-link(:to="{ name: 'signup' }"): div sign up
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
