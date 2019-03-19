<template lang="pug">
  .d-inline
    input(
      v-if="type.type === 'str'"
      v-bind:value="value.value"
      v-on:input="$emit('input', $event.target.value)"
    )
    input.num(
      v-if="type.type === 'num'"
      type="number"
      v-bind:value="value.value"
      v-on:input="setLiteral(Number($event.target.value))"
    )
    .d-inline(v-if="type.type === 'bool'")
      select.mx-1(
        v-bind:value="value.value" 
        v-on:input="setLiteral(JSON.parse($event.target.value))"
      )
        option(value="true") Yes
        option(value="false") No
</template>

<script>
export default {
  name: 'BlockParamEditor',
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
      this.$emit('input', { type: "literal", value: lit })
    }
  },
}
</script>

<style scoped>
.num {
  width: 75px;
  outline: solid 1px;
  margin: 0 5px;
}
</style>

