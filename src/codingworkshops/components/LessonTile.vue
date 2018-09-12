<template>
  <router-link
    :to="{
      name: 'lesson',
      params: {
        workshop: lesson.workshop.name,
        lesson: lesson.id
      }
    }"
    class="lesson"
    tag="li"
  >
    <h2>{{ lesson.name }}</h2>
    <p>{{ lesson.description }}</p>
  </router-link>
</template>

<script>
export default {
  name: 'LessonTile',
  props: {
    lesson: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped lang="stylus">
@import '~@/styles/defs'

.lesson {
  tile('tile', palette.light-purple)
  padding: 20px;
}
</style>
