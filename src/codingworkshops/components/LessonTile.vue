<template lang="pug">
router-link.lesson.tile(
  :to=`{
    name: 'lesson',
    params: {
      human: lesson.workshop.author.username,
      workshop: lesson.workshop.name,
      lesson: lesson.index,
    }
  }`
  tag="li"
)
  div
    h2.no-margin {{ lesson.name }}
    p {{ lesson.description }}
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
