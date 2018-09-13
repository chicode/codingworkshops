<template lang="pug">
ul.lessons
  LessonTile.lesson(
    v-for='lesson in lessons',
    :lesson='lesson',
    :key='lesson.name'
  )
</template>

<script>
import LessonTile from './LessonTile'

export default {
  name: 'LessonTiles',
  components: { LessonTile },
  props: {
    lessons: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped lang="stylus">
@import '~@/styles/defs'
.lessons {
  .lesson {
   width: 100%;
  }
}
</style>
