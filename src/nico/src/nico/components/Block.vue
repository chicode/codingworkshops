<template lang="pug">
  draggable.my-3(
    :class="['dragArea', { clone }]"
    :list="children" :group="group" :clone="onClone" @add="onAdd" ghostClass="ghost" tag="ul"
  )
    li(v-for="child in children")
      div.if(v-if="child.type === 'if'")
        | if
        BlockParamEditor(v-model="child.condition" :type="{ name: 'condition', type: 'bool' }")
        Block.child(:children="child.children")
      div(v-if="child.type === 'getVar'")
        input.var(v-model="child.varname")
      div.if(v-if="child.type === 'let'")
        | let
        div.child.my-2(v-for="(def, i) in child.defs")
          button.button.d-inline.mr-2(@click="child.defs.splice(i, 1)"): .text-danger x
          input.var(v-model="def.name")
          BlockParamEditor(v-model="def.value" :type="{ name: 'value', type: 'str' }")
        .child: button.button.d-.mt-2(
          @click="child.defs.push(({ type: 'literal', value: '' }))"
        ): div add def
        | in
        Block.child(onlyOne :children="child.body")
      div(v-if="child.type === 'callStdlib'")
        | {{ child.func }}
        BlockParamEditor(
          v-for="(param, i) in marsFuncs.find(func => child.func === func.name).parameters"
          v-model="child.params[i]"
          :type="param"
        )
      div(v-if="child.type === 'setVar'")
        | set
        input.var(v-model="child.varname")
        | =
        BlockParamEditor(
          :type="{name: 'var', type: 'str'}"
          v-model="child.expr"
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
    onlyOne: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    group () {
      return {
        name: 'blocks',
        put: () => !console.log(this.onlyOne ? this.children.length === 0 : true),
        ...(this.clone ? { pull: 'clone' } : {}),
      }
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
.var {
  max-width: 100px;
  outline: solid 1px;
  margin: 0 10px;
}
</style>
