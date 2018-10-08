<template lang="pug">
tiles.slides(:items='slides' type='slide' :edit='edit' :draggable='edit')
  template(slot-scope='{ item }')
    h2.no-margin {{ item.name }}
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

<style scoped lang="stylus">
@import '~@/styles/defs'
</style>
