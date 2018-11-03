<template lang="pug">
.container(v-if="!loading")
  .row.align-items-center
    img(src="img/landing-welcome.svg")
    h1 Anyone can&nbsp;
      span.text-purple learn&nbsp;
      span.text-blue to&nbsp;
      span.text-orange code!
  h1: a set of interactive coding tutorials, for all skill levels!

  p.h2(v-if="!currentUser")
    router-link.button(:to="{ name: 'enter' }"): div login
    | to save progress
  p.h2(v-else)
    | welcome,&nbsp;
    router-link.link(:to=`{
      name: 'human',
      params: { human: currentUser.username }
    }`) {{ currentUser.username }}
    |!

  WorkshopTiles(:workshops="allWorkshops")
</template>

<script>
import Query from '@/components/Query'
import WorkshopTiles from '../components/WorkshopTiles'
import { apollo } from '@/edit-abstractions'

export default {
  name: 'Home',
  components: { Query, WorkshopTiles },
  data: () => ({
    loading: 0,
    currentUser: null,
    allWorkshops: [],
  }),
  apollo: {
    currentUser: apollo('CurrentUser_minimal', { queryKey: 'currentUser' }),
    allWorkshops: apollo('AllWorkshops', { queryKey: 'allWorkshops' }),
  },
}
</script>
