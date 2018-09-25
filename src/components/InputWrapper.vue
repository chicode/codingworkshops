<template lang='pug'>
.input-wrapper
  input.input(v-show='focused' v-click-outside='unfocus' @keydown.enter='unfocus' v-model='value_' ref='input')
  .content(v-show='!focused' @click='focus' ref='content'): slot
</template>

<script>
export default {
  name: 'InputWrapper',
  props: {
    value: {
      type: null,
      required: true,
    },
  },
  data () {
    return {
      value_: this.value,
      focused: false,
    }
  },
  methods: {
    focus (e) {
      this.$refs.input.style.width = this.$refs.content.clientWidth + 'px'
      this.focused = true
      // necessary to prevent unfocus event handler from registering this one
      e.stopPropagation()
      // focus on the next tick
      setTimeout(() => this.$refs.input.focus(), 0)
    },

    unfocus () {
      this.focused = false
      this.$emit('input', this.value_)
    },
  },
}
</script>

<style scoped lang="stylus">
@import '~@/styles/defs'

.content {
  padding: 0 10px 3px 10px;
  margin-left: -10px;
  display: inline-block;
}

.content:hover {
  background: palette.gray-2;
  border-radius: borders.standard.radius;
}
</style>
