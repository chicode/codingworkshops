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
    span coding workshops is a set of interactive coding tutorials, for all skill levels!
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
import '~@/styles/defs.styl'

.home {
  standard-layout()
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
</style>
