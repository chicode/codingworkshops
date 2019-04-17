<template lang="pug">
  draggable(
    :class="['dragArea', { clone }]"
    :clone="onClone" @add="onAdd" :list="exprs" :group="group" ghostClass="ghost"
  )
    .d-inline(v-for="expr in exprs")
      div(v-if="expr.type === 'var'") {{ expr.varname }}
</template>

<script>
import { Fragment } from 'vue-fragment'
import draggable from 'vuedraggable'
import _ from 'lodash'

export default {
  name: 'Expr',
  components: {
    draggable,
    Fragment,
  },
  props: {
    clone: {
      type: Boolean,
      default: false,
    },
    exprs: {
      type: Array,
      required: true,
    },
  },
  computed: {
    group () {
      return { name: 'exprs', pull: this.clone ? 'clone' : true, put: this.canPut }
    },
  },
  methods: {
    onClone: _.cloneDeep,
    onAdd (evt) {
      if (this.clone) {
        // remove the new index from children, effectively not putting it there at all
        this.exprs.splice(evt.newIndex, 1)
      }
    },
    canPut (evt,a,b,c,d) {
      return this.clone || this.exprs.length === 0
    },
  },
}
</script>

<style scoped>
.dragArea.clone .ghost {
  display: none;
}
.dragArea {
  min-height: 30px;
  min-width: 60px;
}
</style>


