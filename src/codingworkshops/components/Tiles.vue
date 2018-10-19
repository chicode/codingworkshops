<template lang="pug">
  component(:is='edit && draggable ? "vue-draggable" : "ul"' @end='drag' element='ul')
    // for some reason the key being the item index breaks the ordering of the items
    // and vue draggable shows the incorrect result of a drag operation
    component(
      :is='router ? "router-link" : "li"'
      v-for='item in items'
      :key='item.name'
      :to=`{
        name: edit ? 'edit-' + type : type,
        params: getRouteParams(item)
      }`
      tag='li'
    ): tile(:edit='edit' @del='del(item.id)')
      slot(:item='item')
    slot(name='footer')
</template>

<script>
import VueDraggable from 'vuedraggable'
import Tile from './Tile'
import { del, drag } from '@/edit-abstractions'

export default {
  name: 'Tiles',
  components: { Tile, VueDraggable },
  props: {
    items: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
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
    router: {
      type: Boolean,
      required: false,
      default: true,
    },
    getRouteParams: {
      type: Function,
      required: false,
      default: function (item) {
        return {
          ...this.$route.params,
          [this.type]: item.index,
        }
      },
    },
  },
  methods: {
    del (...args) { del(this.type).call(this, ...args) },
    drag (...args) { drag(this.type).call(this, ...args) },
  },
}
</script>
