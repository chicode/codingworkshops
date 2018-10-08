<template lang='pug'>
.input-wrapper(ref='wrapper')
  markdown-editor.wrapper(v-if='markdown' v-show='focused' v-click-outside='unfocus' @keydown.enter='unfocus' v-model='value_' ref='input')
  input.wrapper(v-else v-show='focused' v-click-outside='unfocus' @keydown.enter='unfocus' v-model='value_' ref='input')
  .content(v-show='!focused' @click='focus' ref='content'): slot
</template>

<script>
import MarkdownEditor from './MarkdownEditor'

export default {
  name: 'InputWrapper',
  components: { MarkdownEditor },
  props: {
    value: {
      type: null,
      required: true,
    },
    markdown: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data () {
    return {
      value_: this.value,
      focused: false,
    }
  },
  mounted () {
    this.value_ = ''
  },
  methods: {
    focus (e) {
      this.$refs.wrapper.dispatchEvent(new Event('focus'))

      if (!this.markdown) {
        const { input: { style }, content } = this.$refs
        const child = content.children[0]

        style.width = child.clientWidth + 'px'
        const computedStyle = window.getComputedStyle(child)
        style.font = computedStyle.font
        // the input's padding is set to the margin in order to move the border
        style.padding = computedStyle.margin
      }

      this.focused = true
      // necessary to prevent unfocus event handler from registering this one
      e.stopPropagation()
      // focus on the next tick
      setTimeout(() => {
        if (this.markdown) {
          this.$refs.input.$children[0].simplemde.codemirror.focus()
        } else {
          this.$refs.input.focus()
        }
      }, 0)
    },

    unfocus () {
      // prevent activation when not focused
      if (this.focused) {
        this.focused = false
        this.$emit('input', this.value_)
      }
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
  background: palette.gray-3;
  border-radius: borders.standard.radius;
}

input.wrapper {
  border: 1px solid palette.gray-2;
  border-radius: borders.standard.radius;
}
</style>

<style lang="stylus">
@import '~@/styles/defs'
.wrapper .CodeMirror {
  border: 1px solid palette.gray-2;
}
</style>
