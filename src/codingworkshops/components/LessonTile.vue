<template lang="pug">
router-link.lesson.tile(
  :to=`{
    name: 'lesson',
    params: {
      workshop: lesson.workshop.name,
      lesson: lesson.id
    }
  }`
  tag="li"
)
  div
    h2 {{ lesson.name }}
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
