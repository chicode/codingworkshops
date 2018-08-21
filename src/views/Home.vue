<template>
  <Query
    :query="require('@/graphql/q/AllWorkshops.gql')"
  >
    <template slot-scope="{ data: { allWorkshops } }">
      <div class="welcome">
        <img src="img/landing-welcome.svg">
        <h1>Anyone can
          <!-- &nbsp; creates spaces between span tags -->
          <span class="accent-1">learn&nbsp;</span>
          <span class="accent-2">to&nbsp;</span>
          <span class="accent-3">code!</span>
        </h1>
      </div>
      <h2 class="explainer">
        <span class="title">coding workshops</span> is a set of interactive coding tutorials, for all skill levels!
      </h2>

      <p class="login">
        <router-link
          :to="{ name: 'enter' }"
          class="button"
        >login</router-link> to save progress
      </p>

      <WorkshopTiles :workshops="allWorkshops" />
    </template>
  </Query>
</template>

<script>
import Query from '@/components/Query'
import WorkshopTiles from '@/components/WorkshopTiles'

export default {
  name: 'Home',
  components: { Query, WorkshopTiles },
}
</script>

<style scoped lang="stylus">
@import '~@/styles/defs.styl'

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
    font-size: font-sizes[0];
    width: 500px;
  }
  .accent-1 {
    color: colors.accent-1;
  }
  .accent-2 {
    color: colors.accent-2;
  }
  .accent-3 {
    color: colors.accent-3;
  }
  span {
    display: inline-block;
  }
}

.explainer {
  font-size: font-sizes[1];
  margin-top: 100px;
  text-align: center;

  .title {
    text-decoration: underline;
  }
}

.login {
  .button {
    button(palette.light-green);
  }

  font-size: font-sizes[1];
  font-family: fonts.heading;
  text-align: center;
  margin-top: 100px;
}

</style>
