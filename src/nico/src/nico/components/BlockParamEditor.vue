<template lang="pug">
  div
    div(v-if)
</template>

<script>
export default {
  name: 'BlockParamEditor',
  props: {
    param: {
      type: {
        name: String,
        type: String,
      },
      required: true,
    },
    value: {
      required: true,
    }
  },
}
</script>
