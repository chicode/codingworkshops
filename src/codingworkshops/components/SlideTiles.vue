<template lang="pug">
component.slides(:is='edit ? "vue-draggable" : "ul"' @end='drag')
  router-link(
    v-for='slide in slides'
    :key='slide.index'
    :to=`{
      name: edit ? 'edit-slide' : 'slide',
      params: {
        human: $route.params.human,
        workshop: $route.params.workshop,
        lesson: $route.params.lesson,
        slide: slide.index,
      }
    }`
    tag='li'
  ): tile(:edit='edit' @del='del(slide.id)' )
    h2.no-margin {{ slide.name }}
</template>

<script>
import VueDraggable from 'vuedraggable'
import Tile from './Tile'

export default {
  name: 'SlideTiles',
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
  },
  methods: {
    del (pk) {
      this.$apollo.mutate(
        require('@/graphql/m/DeleteSlide').default(
          { pk },
          this.$route.params
        )
      )
    },

    drag ({ oldIndex, newIndex }) {
      this.$apollo.mutate(
        require('@/graphql/m/MoveSlide').default(
          {
            pk: this.slides[oldIndex].id, index: newIndex,
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
</style>
