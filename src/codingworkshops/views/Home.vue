<template lang="pug">
query(:query="require('@/graphql/q/AllWorkshops.gql')")
  template(slot-scope='{ data: { allWorkshops } }')
    .welcome
      img(src='img/landing-welcome.svg')
      h1 Anyone can
        // &nbsp; creates spaces between span tags
        span.accent-1 learn&nbsp;
        span.accent-2 to&nbsp;
        span.accent-3 code!
    h2.explainer
      span.underline coding workshops is a set of interactive coding tutorials, for all skill levels!
    p.login.h2
      router-link.button(:to="{ name: 'enter' }")
        div login
      | &nbsp;to save progress
    WorkshopTiles(:workshops='allWorkshops')
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
import '~@/styles/defs.styl'

.root {
 margin-top: 100px;
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
  margin-top: 100px;
  text-align: center;
}

.login {
  text-align: center;
  margin-top: 100px;

  .button div {
    font-weight: normal;
  }
}

</style>
