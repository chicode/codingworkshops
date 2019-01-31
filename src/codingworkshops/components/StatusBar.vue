<template lang="pug">
.d-flex.justify-content-between.p-4
  router-link(:to="{ name: 'home' }")
    span.accent-2 coding
    span.accent-1 workshops
  div.d-flex(v-if='$auth.loggedIn()')
    router-link.mr-2(:to="{ name: 'human', params: { human: $auth.currentUser().username } }") {{ $auth.currentUser().username }}
    button(@click='logout') logout
  div(v-else='')
    router-link(:to="{ name: 'enter' }") login
</template>

<script>
export default {
  name: 'StatusBar',
  methods: {
    async logout () {
      await this.$auth.logout()
      this.$router.push({ name: 'home' })
    },
  },
}
</script>
