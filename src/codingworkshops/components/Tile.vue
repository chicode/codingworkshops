<template lang="pug">
div.tile.root: div
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
.controls {
  position: absolute;
  right: 10px;
  display: flex;
}
</style>
