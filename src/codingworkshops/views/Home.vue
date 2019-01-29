<template lang="pug">
.container.mt-7(v-if="!$rest.loading")
  .row.align-items-center.justify-content-center.mb-6
    img.col-6.mr-5(src="img/landing-welcome.svg")
    h1.col-4 Anyone can learn to code!

  p.h3.text-center(v-if="!$rest.currentUser.ok")
    router-link.button(:to="{ name: 'enter' }" tag="div"): div.font-weight-normal login
    | &nbsp;&nbsp;to save progress
  p.h3.text-center(v-else)
    | welcome,&nbsp;
    router-link(:to=`{
      name: 'human',
      params: { human: $rest.currentUser.username }
    }` tag="a") {{ $rest.currentUser.username }}
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
