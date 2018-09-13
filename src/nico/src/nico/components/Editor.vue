<template lang="pug">
.editor
  Booklet
  codemirror(
    ref="cm"
    :options="$options.cmOptions"
    :value="code"
    class="vue-CodeMirror"
    @input="setCode"
    @ready="init"
  )
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { codemirror } from 'vue-codemirror'

import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/display/autorefresh.js'

import Booklet from './Booklet'

export default {
  name: 'Editor',

  components: { codemirror, Booklet },

  cmOptions: {
    tabSize: 2,
    mode: 'text/javascript',
    lineNumbers: true,
    autorefresh: true,
  },

  computed: {
    ...mapState('nico', ['code', 'view', 'error']),
    cm () {
      return this.$refs.cm.codemirror
    },
  },

  watch: {
    error (error) {
      if (error && error.isSyntax) {
        if (this.mark) this.mark.clear()
        this.mark = this.cm.markText(error.from, error.to, { className: 'error', atomic: true })
      }
    },

    view (view) {
      if (view === 'editor') {
        this.cm.refresh()
      }
    },
  },

  methods: {
    ...mapMutations('nico', ['setCode']),
    init () {
      // must wait for webfonts to finish loading, or else editor will be improperly initialized
      document.fonts.ready.then(() => {
        this.cm.refresh()
      })
    },
  },
}
</script>

<style scoped lang="stylus">
.editor, .vue-CodeMirror {
  overflow-y: hidden;
}
</style>

<style lang="stylus">
@import '../../styles/defs.styl'

.CodeMirror {
  height: 100%;

  * {
    font-family: fonts.code;
  }
}

.CodeMirror-gutters {
  background: white;
  border-right: 0;
  width: 60px;
}
</style>
