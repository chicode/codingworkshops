<template lang="pug">
div.root
  div.instructions
    h1.name {{ slide.name }}
    p.description {{ slide.description }}
    ul.directions
      h2 Directions
      li.direction(
        v-for="({ description }, index) in slide.directionSet"
        :key="description"
      )
        span.text(:style="directionStyle(index)") {{ description }}
        div.buttons(v-if="index === directionIndex")
          button.button(@click="nextDirection")
            div done!
          // TODO: implement help

  Nico.nico
</template>

<script>
import Nico from '@/nico/src/nico/App'

export default {
  name: 'InstructionSlide',
  components: { Nico },
  props: {
    slide: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    directionIndex: 0,
  }),
  watch: {
    slide () {
      this.directionIndex = 0
    },
  },
  methods: {
    nextDirection () {
      this.directionIndex += 1
      if (this.directionIndex === this.slide.directionSet.length) {
        this.$emit('finished')
      }
    },
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
        display: inline;
        margin-left: 15px;
        position: relative;
        bottom: -10px;

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
