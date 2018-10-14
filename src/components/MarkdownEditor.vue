<template lang="pug">
markdown-editor.markdown(:configs='configs' :value='value' @input='value => $emit("input", value)')
</template>

<script>
import MarkdownEditor from 'vue-simplemde/src/markdown-editor'
import 'simplemde/dist/simplemde.min.css'

/* eslint-disable vue/require-default-prop */

export default {
  name: 'MarkdownEditorWrapper',
  components: {
    MarkdownEditor,
  },
  props: {
    value: String,
    placeholder: {
      type: String,
      required: false,
    },
  },
  data () {
    return {
      configs: {
        toolbar: false,
        status: false,
        placeholder: this.placeholder,
        autoDownloadFontAwesome: false,
      },
    }
  },
}
</script>

<style lang="stylus">
@import '~@/styles/defs'

.markdown .CodeMirror {
  standard-border()
  margin-bottom: 10px;
}
</style>
