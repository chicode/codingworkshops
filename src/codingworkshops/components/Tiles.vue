<template lang="pug">
ul
  component(:is='edit && draggable ? "vue-draggable" : "div"' @end='drag')
    router-link(
      v-for='item in items'
      :key='item.index'
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
    del (pk) {
      this.$apollo.mutate(
        require(`@/graphql/m/Delete${this.type}`).default(
          { pk },
          this.$route.params
        )
      )
    },

    drag ({ oldIndex, newIndex }) {
      this.$apollo.mutate(
        require(`@/graphql/m/Move${this.type}`).default(
          {
            pk: this.items[oldIndex].id, index: newIndex,
          },
          this.$route.params
        )
      )
    },
  },
}
</script>
