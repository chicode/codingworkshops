<template lang="pug">
  draggable(
    :class="['dragArea', { clone }]"
    :list="children" :group="group" :clone="onClone" @add="onAdd" ghostClass="ghost" tag="ul"
  )
    li(v-for="child in children")
      div.if(v-if="child.type === 'if'")
        | if
        BlockParamEditor(v-model="child.condition" :type="{ name: 'condition', type: 'bool' }")
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
        ? { name: 'blocks', pull: 'clone' }
        : { name: 'blocks' }
    },
    marsFuncs: () => FUNCTIONS_ONLY,
  },
  methods: {
    onClone: _.cloneDeep,
    onAdd (evt) {
      if (this.clone) {
        // remove the new index from children, effectively not putting it there at all
        this.children.splice(evt.newIndex, 1)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.child {
  margin-left: 20px;
}
.dragArea {
  outline: 1px dotted;
  min-height: 20px;
  padding: 10px;
}
.if {
  > .dragArea {
    min-height: 20px;
  }
  margin-bottom: 15px;
  padding-bottom: 0;
}
.dragArea.clone .ghost {
  display: none;
}
</style>
