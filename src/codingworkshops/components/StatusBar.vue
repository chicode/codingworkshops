<template lang="pug">
.d-flex.justify-content-between.p-4
  router-link(:to="{ name: 'home' }")
    span.accent-2 coding
    span.accent-1 workshops
  div(v-if="!$rest.loading")
    div.d-flex(v-if='$rest.currentUser')
      router-link.mr-2(:to="{ name: 'human', params: { human: $rest.currentUser.username } }") {{ $rest.currentUser.username }}
      button(@click='logout') logout
    div(v-else='')
      router-link(:to="{ name: 'enter' }") login
</template>

<script>
export default {
  name: 'StatusBar',
  rest: {
    currentUser: 'me',
  },
  methods: {
    async logout () {
      localStorage.removeItem('jwt')
      localStorage.removeItem('id')
      this.$router.push({ name: 'home' })
    },
  },
}
</script>
