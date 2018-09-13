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
