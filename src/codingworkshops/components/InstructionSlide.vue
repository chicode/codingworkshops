<template lang="pug">
div.d-flex.full
  div.instructions
    h1.mb-3 {{ slide.name }}
    p.description.marked(v-marked="slide.description")
    ul.mt-6(v-if="slide.directions.length")
      h2.font-weight-bold Directions
      li.mt-2(
        v-for="({ description }, index) in slide.directions"
        :key="description"
      )
        p(:style="directionStyle(index)" v-marked="description")
        div.d-flex.mt-3(v-if="index === directionIndex")
          div.pt-1
            button.button(@click="nextDirection")
              div done!

  Nico(:show-greeting="false" language="Python" :script-boilerplate="false").nico
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

import Nico from '@/nico/src/nico/App'

export default {
  name: 'InstructionSlide',
  components: { Nico },
  computed: {
    ...mapState('codingworkshops', ['directionIndex']),
    ...mapGetters('codingworkshops', ['slide']),
  },
  methods: {
    ...mapActions('codingworkshops', ['nextDirection']),
    directionStyle (index) {
      let color
      if (index < this.directionIndex) {
        color = '#1CB893'
      } else if (index === this.directionIndex) {
        color = 'black'
      } else {
        color = '#C1C1C1'
      }
      return {
        color,
        transitionDuration: '.2s',
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '~@/styles/defs';

.instructions {
  overflow-y: auto;
  flex: 1 0 40%;
  padding: 30px;
  @include light-border;
}

.nico {
  overflow-y: auto;
  flex: 1 0 60%;
  padding: 50px;
  @include light-border;
  @include light-margin-left;
}
</style>
