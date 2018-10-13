<template lang="pug">
tiles.workshops(:items='workshops' type='workshop' :edit='edit' :getRouteParams='getRouteParams')
  template(slot-scope='{ item }')
    h2.bold.no-margin {{ item.name }}
    p {{ item.description }}

  template(slot='footer')
    // the empty elements help make the flex grid look
    // like it's a list despite it actually having justify-content: center
    li.empty(v-for='i in 20', :key='i')
</template>

<script>
import Tiles from './Tiles'

export default {
  name: 'WorkshopTiles',
  components: { Tiles },
  props: {
    workshops: {
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
    getRouteParams (workshop) {
      return {
        workshop: workshop.slug,
        human: workshop.author.username,
      }
    },
  },
}
</script>

<style lang="stylus">
@import '~@/styles/defs'

.workshops {
  margin-top: 30px;

  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  > * {
    width: 300px;
    margin: 10px;
  }
}
</style>
