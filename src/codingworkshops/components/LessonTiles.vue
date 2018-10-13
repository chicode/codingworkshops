<template lang="pug">
tiles.lessons(:items='lessons' type='lesson' :edit='edit' :draggable='edit')
  template(slot-scope='{ item }')
    h2.no-margin {{ item.name }}
    p {{ item.description }}
</template>

<script>
import Tiles from './Tiles'

export default {
  name: 'LessonTiles',
  components: { Tiles },
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
