<template lang="pug">
div.root
  div.instructions.light-tile
    h1.name {{ slide.name }}
    p.description {{ slide.description }}
    ul.directions
      li(
        v-for="{ description } in slide.directions"
        :key="description"
      ) {{ description }}
  Nico.nico.light-tile
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
.root {
  display: flex;
}

.instructions {
  flex: 1 0 20%;
  margin: 50px;
}

.nico {
  flex: 1 0 60%;
}
</style>
