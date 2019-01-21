<template lang="pug">
.workshop.standard-layout(v-if="!$rest.loading")
  h1.name {{ $rest.workshop.name }}
  p.description {{ $rest.workshop.description }}
  LessonTiles.tiles(:lessons="$rest.workshop.lessons")
</template>

<script>
import LessonTiles from '../components/LessonTiles'

export default {
  name: 'Workshop',
  components: { LessonTiles },
  rest () {
    return {
      workshop: '/workshops/' + this.$route.params.workshop,
    }
  },
}
</script>
