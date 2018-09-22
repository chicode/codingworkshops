<template lang="pug">
.human
  query(:query="require('@/graphql/q/CurrentUser_minimal.gql')")
    template(slot-scope='{ data: { currentUser } }')
      div.profile(v-if='currentUser')
        router-link(:to="{ name: 'human', params: { username: currentUser.username } }") {{ currentUser.username }}
        button(@click='logout') logout
      div(v-else='')

</template>

<script>
export default {
  name: 'Human',
}
</script>
