<template lang="pug">
  draggable.dragArea(tag="ul" :list="children" :group="group" :clone="onClone")
    li(v-for="child in children")
      div(v-if="child.type === 'if'")
        | if {{ child.condition }}
        Block.child(:children="child.children")
      div(v-else-if="child.type === 'callMars'")
        | {{ child.func }}
        BlockParamEditor(
          v-for="(param, i) in marsFuncs.find(func => child.func === func.name).parameters"
          v-model="child.params[i]"
          :type="param"
        )
</template>

<script>
import draggable from 'vuedraggable'
import BlockParamEditor from './BlockParamEditor'
import { FUNCTIONS_ONLY } from '../constants'
import _ from 'lodash'

export default {
  name: 'Block',
  components: {
    draggable,
    BlockParamEditor,
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
    marsFuncs: () => FUNCTIONS_ONLY,
  },
  methods: {
    onClone: _.cloneDeep,
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
