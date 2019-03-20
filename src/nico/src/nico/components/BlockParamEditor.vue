<template lang="pug">
  .d-inline-block.param-editor
    Expr.position-absolute(:exprs="expr")
    div(:class="{'d-none':expr.length}")
      input(
        v-if="type.type === 'str'"
        v-bind:value="value.value"
        v-on:input="$emit('input', $event.target.value)"
      )
      input.my-1.num(
        v-if="type.type === 'num'"
        type="number"
        v-bind:value="value.value"
        v-on:input="setLiteral(Number($event.target.value))"
      )
      fragment(v-if="type.type === 'bool'")
        select.mx-1(
          v-bind:value="value.value"
          v-on:input="setLiteral(JSON.parse($event.target.value))"
        )
          option(value="true") Yes
          option(value="false") No
</template>

<script>
import { Fragment } from 'vue-fragment'
import draggable from 'vuedraggable'
import Expr from './Expr'

export default {
  name: 'BlockParamEditor',
  components: {
    Expr,
    draggable,
    Fragment,
  },
  data: () => ({
    expr: [],
  }),
  props: {
    value: {
      type: Object,
      required: true,
    },
    type: {
      type: Object,
      required: true,
    },
  },
  methods: {
    setLiteral (lit) {
      this.$emit('input', { type: 'literal', value: lit })
    },
  },
}
</script>
<style scoped>
.num {
  width: 75px;
  outline: solid 1px;
}
.param-editor {
  margin: 0 5px;
  min-height: 30px;
  min-width: 60px;
}
</style>
