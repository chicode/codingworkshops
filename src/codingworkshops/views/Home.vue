<template lang="pug">
.container(v-if="!$rest.loading")
  .row.align-items-center
    img(src="img/landing-welcome.svg")
    h1 Anyone can&nbsp;
      span.text-purple learn&nbsp;
      span.text-blue to&nbsp;
      span.text-orange code!
  h1: a set of interactive coding tutorials, for all skill levels!

  p.h2(v-if="!$rest.currentUser")
    router-link.button(:to="{ name: 'enter' }"): div login
    | to save progress
  p.h2(v-else)
    | welcome,&nbsp;
    router-link.link(:to=`{
      name: 'human',
      params: { human: $rest.currentUser.username }
    }`) {{ $rest.currentUser.username }}
    |!

  WorkshopTiles(:workshops="$rest.allWorkshops")
</template>

<script>
import WorkshopTiles from '../components/WorkshopTiles'

export default {
  name: 'Home',
  components: { WorkshopTiles },
  rest: {
    currentUser: 'me',
    allWorkshops: 'workshops',
  },
}
</script>
