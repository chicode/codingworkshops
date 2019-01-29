<template lang="pug">
ul.mt-5
  router-link.w-100.mb-4.tile(
    v-for="lesson in lessons"
    tag="li"
    :key="lesson.name"
    :to=`{
      name: 'lesson',
      params: Object.assign($route.params, {
        lesson: lesson.index
      })
    }`
  ): div
    h2.bold.no-margin {{ lesson.name }}
    p {{ lesson.description }}
</template>

<script>
export default {
  name: 'LessonTiles',
  props: {
    lessons: {
      type: Array,
      required: true,
    },
  },
}
</script>
