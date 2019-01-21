<template lang="pug">
ul.lessons
  router-link(
    v-for="lesson in lessons"
    tag="li"
    :key="lesson.name"
    :to=`{
      name: 'lesson',
      params: Object.assign($route.params, {
        lesson: lesson.index
      })
    }`
  )
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

<style lang="stylus">
.lessons {
  margin: 50px 0;

  li {
     width: 100%;
     margin-bottom: 20px;
  }
}
</style>
