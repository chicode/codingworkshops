<template lang="pug">
div.instruction-slide
  div.instructions
    h1.name {{ slide.name }}
    p.description.marked(v-marked="slide.description")
    ul.directions(v-if="slide.directionSet.length")
      h2 Directions
      li.direction(
        v-for="({ description }, index) in slide.directionSet"
        :key="description"
      )
        p.text.marked(:style="directionStyle(index)" v-marked="description")
        div.buttons(v-if="index === directionIndex")
          button.button(@click="nextDirection")
            div done!
          // TODO: implement help

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
      return { color }
    },
  },
}
</script>

<style scoped lang="stylus">
@import './InstructionSlide.styl'
</style>
