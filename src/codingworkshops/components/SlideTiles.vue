<template lang="pug">
tiles.slides(:items='slides' type='slide' :edit='edit' :draggable='edit')
  template(slot-scope='{ item }')
    h2.no-margin {{ item.name }}
  template(slot='footer')
    // the empty elements help make the flex grid look
    // like it's a list despite it actually having justify-content: center
    li.empty(v-for='i in 20', :key='i')
</template>

<script>
import Tiles from './Tiles'

export default {
  name: 'SlideTiles',
  components: { Tiles },
  props: {
    slides: {
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
@import '~@/styles/defs'

.slides {
  margin: 50px 0;

  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  li {
    width: 300px;
    margin: 10px;
  }
}
</style>
