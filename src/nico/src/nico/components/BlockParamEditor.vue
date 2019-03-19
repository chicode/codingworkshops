<template lang="pug">
  .d-inline
    .d-inline(v-if="type.type === 'str'")
      input(v-bind:value="value" v-on:input="$emit('input', $event.target.value)")
    .d-inline(v-if="type.type === 'num'")
      input.w-25(
        type="number"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      )
</template>

<script>
export default {
  name: 'BlockParamEditor',
  props: {
    value: {
      required: true,
    },
    type: {
      required: true,
    }
  },
}
</script>
