<template lang="pug">
  .d-flex
    .flex-grow-2.m-3
      h6.font-weight-bold Control Flow
      Block(:children="controlFlow" :clone="true")
      // mw-35 just for displaying blocksRoot
    .flex-grow-2.m-3.mw-35
      h6.font-weight-bold Nico
      Block(:children="nicoFuncs" :clone="true")
      | {{ blocksRoot }}
      br
      | {{ compiledBlocks }}
    .flex-grow-1.p-3
      Block(:children="blocksRoot")
</template>

<script>
import Block from './Block'
import { compile } from '../compileBlocks'

const makeLit = value => ({
  type: 'literal',
  value
})

export default {
  name: 'BlockEditor',
  components: {
    Block,
  },
  data () {
    return {
      blocksRoot: [],
      controlFlow: [
        {
          type: 'if',
          condition: makeLit(false),
          children: [],
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
      ],
    }
  },
  computed: {
    compiledBlocks () {
      return compile(this.blocksRoot)
    }
  }
}
</script>

<style scoped>
.mw-35 {
  max-width: 35%;
}
</style>
