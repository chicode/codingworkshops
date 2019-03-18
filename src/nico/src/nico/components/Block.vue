<template lang="pug">
  draggable.dragArea(tag="ul" :list="children" :group="group")
    li(v-for="child in children")
      div(v-if="child.type === 'if'")
        | if {{ child.condition }}
        Block.child(:children="child.children")
      div(v-else-if="child.type === 'callMars'")
        | call {{ child.func }}
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'Block',
  components: {
    draggable,
  },
  props: {
    children: {
      required: true,
      type: Array,
    },
    clone: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    group () {
      return this.clone
        ? { name: 'blocks', pull: 'clone', put: false }
        : { name: 'blocks' }
    },
  },
  methods: {
    put (...args) {
      console.log(args)
      return true
    },
  },
}
</script>

<style scoped>
.child {
  margin-left: 20px;
}
.dragArea {
  outline: 1px dotted;
  min-height: 20px;
  padding-bottom: 50px;
}
</style>
