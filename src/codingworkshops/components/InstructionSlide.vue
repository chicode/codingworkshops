<template lang="pug">
div.root
  div.instructions
    h1.name(v-html="$options.filters.marked(slide.name)")
    p.description(v-html="$options.filters.marked(slide.description)")
    ul.directions(v-if="slide.directionSet.length")
      h2 Directions
      li.direction(
        v-for="({ description }, index) in slide.directionSet"
        :key="description"
      )
        p.text(:style="directionStyle(index)") {{ description }}
        div.buttons(v-if="index === directionIndex")
          button.button(@click="nextDirection")
            div done!
          // TODO: implement help

  Nico(:show-greeting="false" language="fsharp" :script-boilerplate="false").nico
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
@import '~@/styles/defs'

.root {
  display: flex;
  height: 100%;
}

.instructions {
  overflow-y: auto;
  flex: 1 0 20%;
  padding: 50px;
  light-border()

  .name {
    margin-bottom: 20px;
  }

  .directions {
    margin-top: 40px;

    .direction {
      margin-top: 20px;

      .text {
        transition-duration: .2s;
      }

      .buttons {
        margin-top: 20px;
        display: flex;
        height: 30px;

        div {
          padding: 0 5px;
          font-size: 25px;
        }
      }
    }
  }
}

.nico {
  overflow-y: auto;
  flex: 1 0 60%;
  padding: 50px;
  light-border()
  light-margin-left()
}
</style>
