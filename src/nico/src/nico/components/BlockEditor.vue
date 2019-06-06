<template lang="pug">
  div
    .d-flex
      .flex-1.m-3
        h6.font-weight-bold Control Flow
        Block(:children="controlFlow" clone)
        Expr(:exprs="vars" clone)
        // mw-35 just for displaying blocksRoot
      .flex-1.m-3.mw-35
        h6.font-weight-bold Nico
        Block(:children="nicoFuncs" clone)
      .flex-1.p-3.w-50
        code init
        Block(:children="init")
        code draw
        Block(:children="draw")
        code update
        Block(:children="update")
</template>

<script>
import Block from './Block'
import Expr from './Expr'
import { mapMutations, mapState } from 'vuex'

const makeLit = value => ({
  type: 'literal',
  value,
})

export default {
  name: 'BlockEditor',
  components: {
    Block,
    Expr,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      init: this.data.init,
      draw: this.data.draw,
      update: this.data.update,
      controlFlow: [
        {
          type: 'if',
          condition: makeLit(false),
          children: [],
        },
        {
          type: 'while',
          condition: makeLit(false),
          children: [],
        },
        {
          type: 'setVar',
          varname: '',
          expr: makeLit(''),
        },
      ],
      nicoFuncs: [
        {
          type: 'callMars',
          func: 'sprite',
          params: [0, 0, 0].map(makeLit),
        },
        {
          type: 'callMars',
          func: 'rect',
          params: [0, 0, 0, 0].map(makeLit),
        },
        {
          type: 'callMars',
          func: 'point',
          params: [0, 0].map(makeLit),
        },
        {
          type: 'callMars',
          func: 'line',
          params: [0, 0, 0, 0].map(makeLit),
        },
        {
          type: 'callMars',
          func: 'text',
          params: ['', 0, 0].map(makeLit),
        },
        {
          type: 'callMars',
          func: 'tilemap',
          params: [],
        },
      ],
      vars: [
        {
          type: 'getVar',
          varname: 'yee',
        },
      ],
    }
  },
  computed: {
    blocksRoot() {
      return {
        init: this.init,
        draw: this.draw,
        update: this.update,
      }
    },
  },
  watch: {
    init: {
      handler () {
        this.$emit('input', this.blocksRoot)
      },
      deep: true,
    },
    draw: {
      handler () {
        this.$emit('input', this.blocksRoot)
      },
      deep: true,
    },
    update: {
      handler () {
        this.$emit('input', this.blocksRoot)
      },
      deep: true,
    },
  },
}
</script>

<style scoped>
.mw-35 {
  max-width: 35%;
}
</style>
