<template  lang="pug">
.signup
  div
    p.error(v-if="errors.email") {{ errors.email }}
    input.input(
      v-model="data.email"
      placeholder="email"
      type="email"
    )
  div
    p.error(v-if="errors.username") {{ errors.username }}
    input.input(
      v-model="data.username"
      placeholder="username"
    )
  div
    p.error(v-if="errors.password") {{ errors.password }}
    input.input(
      v-model="data.password"
      placeholder="password"
      type="password"
    )
  div
    input.input(
      v-model="data.password2"
      placeholder="repeat password"
      type="password"
    )
  div
    p.error(v-if="errors.bio") {{ errors.bio }}
    markdown-editor(v-model="data.bio" placeholder="write a little bit about yourself! (markdown supported)")
  div
    p.error(v-if="errors.location") {{ errors.location }}
    input.input(
      v-model="data.location"
      placeholder="where you reside"
      @keyup.enter="signup"
    )

  button.button(@click="signup"): div sign up!
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import { convertErrors } from '@/helpers.js'

export default {
  name: 'Signup',

  components: { MarkdownEditor },

  data: () => ({
    data: {
      email: '',
      username: '',
      password: '',
      password2: '',
      bio: '',
      location: '',
    },
    errors: {},
  }),

  methods: {
    async signup () {
      let haserrored = false
      for (let field of ['email', 'username', 'password', 'password2']) {
        // immutable assignment here is necessary for vue to update
        // the value is held in a list because that's how object errors in django are stored
        if (!this.data[field]) this.errors = { ...this.errors, [field]: ['this is required'] }
        haserrored = true
      }
      if (this.data.password !== this.data.password2) {
        this.errors.password = ['passwords don\'t match']
        haserrored = true
      }
      if (haserrored) return

      const { data: { createUser: { ok, errors } } } = await this.$apollo.mutate(
        require('@/graphql/m/Signup').default(this.data)
      )

      if (ok) {
        this.$router.push({ name: 'home' })
      } else {
        this.errors = convertErrors(errors)
      }
    },
  },
}
</script>

<style scoped lang="stylus">
@import '~@/styles/defs'

.signup {
  width: 300px;
  margin: auto;
  margin-top: 100px;
  margin-bottom: 100px;
}

.input {
  margin-bottom: 10px;
}

.button {
  margin-top: 30px;
}
</style>
