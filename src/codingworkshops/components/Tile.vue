<template lang="pug">
div.root-tile(:class="edit ? 'edit' : 'no-edit'"): div
  .controls(v-if='edit')
    p.error(v-if='confirming') you sure?
    button(@click='del'): img(src='../assets/trash.svg')
  slot
</template>

<script>
export default {
  name: 'Tile',
  props: {
    edit: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    confirming: false,
  }),
  methods: {
    del (e) {
      e.stopPropagation()
      if (this.confirming) {
        this.$emit('del')
        this.confirming = false
      } else {
        this.confirming = true
      }
    },
  },
}
</script>

<style scoped lang="stylus">
@import '~@/styles/defs'

.root-tile.no-edit {
  +tile('tile', palette.light-green) {
    padding: 20px;
  }
}
.root-tile.edit > div {
  padding: 20px;
  standard-border()
  border-radius: 0;
  background: palette.light-blue;
  position: relative;
  cursor: pointer;
}

.controls {
  position: absolute;
  right: 10px;
  display: flex;
}
</style>
