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
    .flex-grow-1.p-3
      Block(:children="blocksRoot")
</template>

<script>
import Block from './Block'

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
          children: [],
        },
      ],
      nicoFuncs: [
        {
          type: 'callMars',
          func: 'sprite',
          params: [],
        },
      ],
    }
  },
}
</script>

<style scoped>
.mw-35 {
  max-width: 35%;
}
</style>
