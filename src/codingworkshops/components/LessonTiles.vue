<template lang="pug">
component(:is='edit ? "vue-draggable" : "div"' @end='drag' class='lessons')
  tile(v-for='lesson in lessons' :edit='edit' @del='del(lesson.id)' :key='lesson.name')
    router-link(
      :key='lesson.name'
      :to=`{
        name: edit ? 'edit-lesson' : 'lesson',
        params: {
          human: $route.params.human,
          workshop: $route.params.workshop,
          lesson: lesson.index,
        }
      }`
    )
      h2.no-margin {{ lesson.name }}
      p {{ lesson.description }}
</template>

<script>
import VueDraggable from 'vuedraggable'
import Tile from './Tile'

export default {
  name: 'EditLessonTiles',
  components: { Tile, VueDraggable },
  props: {
    lessons: {
      type: Array,
      required: true,
    },
    edit: {
      type: Boolean,
      required: false,
      default: false,
    },
    draggable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    del (pk) {
      this.$apollo.mutate(
        require('@/graphql/m/DeleteLesson').default(
          { pk },
          this.$route.params
        )
      )
    },

    drag ({ oldIndex, newIndex }) {
      this.$apollo.mutate(
        require('@/graphql/m/MoveLesson').default(
          {
            pk: this.lessons[oldIndex].id, index: newIndex,
          },
          this.$route.params
        )
      )
    },
  },
}
</script>

<style scoped lang="stylus">
@import '~@/styles/defs'

.lessons {
  margin-top: 50px;

  .lesson {
     width: 100%;
     margin-bottom: 20px;
  }
}
</style>
