<template lang="pug">
.status-bar
  router-link(:to="{ name: 'home' }")
    span.accent-2 coding
    span.accent-1 workshops
  div(v-if="!$rest.loading")
    div.profile(v-if='$rest.currentUser')
      router-link(:to="{ name: 'human', params: { human: $rest.currentUser.username } }") {{ $rest.currentUser.username }}
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
      this.$router.push({ name: 'home' })
    },
  },
}
</script>

<style scoped lang="stylus">
.status-bar {
  display: flex;
  justify-content: space-between;
  padding: 40px;
}
.profile {
  display: flex;
  > * {
    margin-right: 10px;
  }
}
</style>
