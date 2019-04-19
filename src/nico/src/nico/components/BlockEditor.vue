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
        | {{ blocksRoot }}
        br
        | {{ compiledBlocks }}
      .flex-1.p-3.w-50
        Block(:children="blocksRoot")
</template>

<script>
import Block from './Block'
import Expr from './Expr'
import { compile } from '../compileBlocks'
import { mapMutations, mapState } from 'vuex';

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
  data () {
    const localStorageBlocks = window.localStorage.getItem('blocks')
    return {
      blocksRoot: localStorageBlocks ? JSON.parse(localStorageBlocks) : [],
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
          func: 'text',
          params: ['', 0, 0].map(makeLit),
        }
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
    ...mapState('nico', ['blocks']),
    compiledBlocks () {
      return compile(this.blocksRoot)
    },
  },
  methods: {
    ...mapMutations('nico', ['setCode', 'setBlocks'])
  },
  watch: {
    blocksRoot: {
      handler () {
        this.setBlocks(this.blocksRoot)
      },
      deep: true,
    }
  }
}
</script>

<style scoped>
.mw-35 {
  max-width: 35%;
}
</style>
