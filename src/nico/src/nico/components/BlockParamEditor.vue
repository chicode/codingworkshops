<template lang="pug">
  .d-inline-block.param-editor
    Expr.position-absolute(:exprs="expr" :class="{ under: !hasExpr }")
    div(:class="{'d-none':expr.length, under: hasExpr}")
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
      fragment(v-if="type.type === 'sprite'")
        canvas.sprite(:width="8" :height="8" v-sprite="sprites[value.value]")
        input.my-1.num(
          type="number"
          v-bind:value="value.value"
          v-on:input="emitInput('sprite', Number($event.target.value))"
        )
</template>

<script>
import { Fragment } from 'vue-fragment'
import draggable from 'vuedraggable'
import Expr from './Expr'
import { mapGetters } from 'vuex'

export default {
  name: 'BlockParamEditor',
  directives: {
    sprite (canvasElement, sprite) {
      console.log(canvasElement, sprite.value)
      canvasElement.width = 8
      canvasElement.height = 8
      const ctx = canvasElement.getContext('2d')
      ctx.drawImage(sprite.value, 0, 0)
    },
  },
  components: {
    Expr,
    draggable,
    Fragment,
  },
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
  data: () => ({
    expr: [],
  }),
  methods: {
    setLiteral (lit) {
      this.$emit('input', { type: 'literal', value: lit })
    },
    emitInput (type, value) {
      this.$emit('input', { type, value })
    },
  },
  computed: {
    hasExpr () {
      return this.expr[0] && this.expr[0].type != 'literal'
    },
    ...mapGetters('sprite/sprite', ['sprites']),
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
.under {
  z-index: -1;
}
.sprite {
  height: 32px;
  width: 32px;
  image-rendering: pixelated;
}
</style>
