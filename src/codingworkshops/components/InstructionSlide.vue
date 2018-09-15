<template lang="pug">
div.root
  div.instructions
    h1.name {{ slide.name }}
    p.description {{ slide.description }}
    ul.directions
      li(
        v-for="{ description } in slide.directions"
        :key="description"
      ) {{ description }}
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
}
</script>

<style scoped lang="stylus">
@import '~@/styles/defs'

.root {
  display: flex;
  height: 100%;
}

.instructions {
  flex: 1 0 20%;
  padding: 50px;
  light-border()
}

.nico {
  overflow-y: scroll;
  flex: 1 0 60%;
  padding: 50px;
  light-border()
  light-margin-left()
}
</style>
