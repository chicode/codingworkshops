<template lang="pug">
.workshop.standard-layout(v-if="!loading")
  h1.name {{ workshop.workshop.name }}
  p.description {{ workshop.workshop.description }}
  LessonTiles.tiles(:lessons="workshop.workshopLessons")
</template>

<script>
import Query from '@/components/Query'
import LessonTiles from '../components/LessonTiles'
import { apollo, data } from '@/edit-abstractions'

export default {
  name: 'Workshop',
  components: { Query, LessonTiles },
  data: () => ({ ...data() }),
  apollo: { workshop: apollo('Workshop') },
}
</script>
