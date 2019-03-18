<template lang="pug">
  .d-flex
    .flex-grow-2
      h6.font-weight-bold Control Flow
      Block(:children="controlFlow" :clone="true")
    .flex-grow-2
      h6.font-weight-bold Nico
      Block(:children="nicoFuncs" :clone="true")
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
          children: []
        }
      ],
      nicoFuncs: [
        {
          type: 'callMars',
          func: 'sprite',
        },
      ],
    }
  },
}
</script>
