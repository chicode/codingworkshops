<template lang="pug">
  .d-inline-block.param-editor
    Block.position-absolute(:children="expr" onlyOne :class="{ under: !hasExpr }")
    div(:class="{'d-none': hasExpr, under: hasExpr}")
      input.str(
        v-if="type.type === 'str'"
        v-bind:value="value.value"
        v-on:input="emitLiteral($event.target.value)"
      )
      input.num.my-1(
        v-if="type.type === 'num'"
        type="number"
        v-bind:value="value.value"
        v-on:input="emitLiteral(Number($event.target.value))"
      )
      fragment(v-if="type.type === 'bool'")
        select.mx-1(
          v-bind:value="value.value"
          v-on:input="emitLiteral(JSON.parse($event.target.value))"
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
import Block from './Block'
import { mapGetters } from 'vuex'

export default {
  name: 'BlockParamEditor',
  directives: {
    sprite (canvasElement, sprite) {
      canvasElement.width = 8
      canvasElement.height = 8
      const ctx = canvasElement.getContext('2d')
      ctx.drawImage(sprite.value, 0, 0)
    },
  },
  components: {
    Block,
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
  mounted () {
    if (this.value.type != 'literal') {
      this.expr.push(this.value)
    }
  },
  methods: {
    emitLiteral (lit) {
      this.emitInput('literal', lit)
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
  watch: {
    expr: {
      handler () {
        if (this.hasExpr) {
          this.$emit('input', this.expr[0])
        }
      },
      deep: true,
    },
  },
}
</script>
<style scoped>
.num,
.str {
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
