<template lang="pug">
.home
  .welcome
    img(src='img/landing-welcome.svg')
    h1 Anyone can&nbsp;
      // &nbsp; creates spaces between span tags
      span.accent-1 learn&nbsp;
      span.accent-2 to&nbsp;
      span.accent-3 code!
  h2.explainer
    span a set of interactive coding tutorials, for all skill levels!
  query(:query="require('@/graphql/q/CurrentUser_minimal.gql')", fetch-policy='network-only')
    template(slot-scope='{ data: { currentUser } }')
      p.h2.login(v-if="!currentUser")
        router-link.button(:to="{ name: 'enter' }"): div login
        | to save progress
      p.h2.login(v-else) welcome,&nbsp;
        router-link.accent-1(:to="{ name: 'human', params: { human: currentUser.username } }")
          | {{ currentUser.username }}
        |!
  query(:query="require('@/graphql/q/AllWorkshops.gql')")
    template(slot-scope='{ data: { allWorkshops } }')
      WorkshopTiles.tiles(:workshops='allWorkshops')
</template>

<script>
import Query from '@/components/Query'
import WorkshopTiles from '../components/WorkshopTiles'

export default {
  name: 'Home',
  components: { Query, WorkshopTiles },
}
</script>

<style scoped lang="stylus">
@import '~@/styles/defs.styl'

.home {
  standard-layout()
  text-align: center;
}

.welcome {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;

  img {
    width: 500px;
    margin-right: 100px;
  }
  h1 {
    width: 500px;
  }

  // to make them act like words
  span {
    display: inline-block;
  }
}

.explainer {
  margin: auto;
  margin-top: 80px;
  text-align: center;
  max-width: 1000px;
}

.tiles {
  margin-top: 50px;
}

.login {
  margin-top: 70px;
  .button {
    display: inline-block;
    margin-right: 20px;
  }
}
</style>
