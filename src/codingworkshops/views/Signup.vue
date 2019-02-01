<template  lang="pug">
div.mx-auto(style="width: 300px;")
  div
    p.error(v-if="errors.email") {{ errors.email[0] }}
    input.input(
      v-model="data.email"
      placeholder="email"
      type="email"
    )
  div
    p.error(v-if="errors.username") {{ errors.username[0] }}
    input.input(
      v-model="data.username"
      placeholder="username"
    )
  div
    p.error(v-if="errors.password") {{ errors.password[0] }}
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
    p.error(v-if="errors.bio") {{ errors.bio[0] }}
    markdown-editor(v-model="data.bio" placeholder="write a little bit about yourself! (markdown supported)")
  div
    p.error(v-if="errors.location") {{ errors.location[0] }}
    input.input(
      v-model="data.location"
      placeholder="where you reside"
      @keyup.enter="signup"
    )

  button.button.mt-3(@click="signup"): div sign up!
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'

export default {
  name: 'Signup',

  components: { MarkdownEditor },

  data () {
    return {
      data: {
        email: '',
        username: '',
        password: '',
        password2: '',
        bio: '',
        location: '',
      },
      errors: {},
    }
  },

  methods: {
    async signup () {
      let hasErrored = false
      for (let field of ['email', 'username', 'password', 'password2']) {
        // immutable assignment here is necessary for vue to update
        // the value is held in a list because that's how object errors in django are stored
        if (!this.data[field]) {
          this.errors = { ...this.errors, [field]: ['this is required'] }
          hasErrored = true
        }
      }
      if (this.data.password !== this.data.password2) {
        this.errors.password = ["passwords don't match"]
        hasErrored = true
      }
      if (hasErrored) return

      const { ok, errors } = await this.$methods.createUser({ user: this.data })

      if (ok) {
        this.navigate({ name: 'home' })
      } else {
        this.errors = errors
      }
    },
  },
}
</script>
