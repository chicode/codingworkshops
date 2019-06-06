<template lang="pug">
div
  div(v-if="language.name === 'Blocks'")
    BlockEditor(:data="JSON.parse(code)" @input="inp => setCode(JSON.stringify(inp))")
  .editor(v-else)
    Booklet
    codemirror(
      ref="cm"
      :options="cmOptions"
      :value="code"
      class="vue-CodeMirror"
      @input="setCode"
      @ready="init"
    )
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { codemirror } from 'vue-codemirror'
import BlockEditor from './BlockEditor'

import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/python/python.js'
import 'codemirror/mode/mllike/mllike.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/display/autorefresh.js'
import 'codemirror/addon/edit/matchbrackets.js'

import Booklet from './Booklet'

function getModeFromLanguage (language) {
  switch (language) {
    case 'Javascript':
      return 'text/javascript'
    case 'Fsharp':
      return 'text/x-fsharp'
    case 'Python':
      return 'python'
  }
}

export default {
  name: 'Editor',

  components: { codemirror, Booklet, BlockEditor },

  data () {
    return {
      marks: [],
    }
  },

  computed: {
    ...mapState('nico', ['code', 'view', 'errors', 'language']),
    cm () {
      return this.$refs.cm ? this.$refs.cm.codemirror : null
    },
    cmOptions () {
      return {
        tabSize: 2,
        mode: getModeFromLanguage(this.language.name),
        lineNumbers: true,
        matchBrackets: true,
        autoRefresh: true,
        extraKeys: {
          'Tab': cm => cm.execCommand('indentMore'),
          'Shift-Tab': cm => cm.execCommand('indentLess'),
        },
      }
    },
  },

  watch: {
    errors (errors) {
      this.marks.forEach(mark => mark.clear())
      this.marks = []
      if (errors.length) {
        for (let error of errors) {
          if (!error.from || !error.to) return

          let mark = this.cm.markText(error.from, error.to, {
            className: 'inline-error',
          })
          // error is in area that doesn't have a character, eg no colon in python function definition
          if (!mark.lines.length) {
            this.cm.replaceRange(' ', error.from, error.to)
            mark = this.cm.markText(error.from, error.to, {
              className: 'inline-error',
              atomic: true,
            })
          }
          this.marks.push(mark)
        }
      }
    },

    view (view) {
      if (view === 'editor') {
        if (this.cm) this.cm.refresh()
      }
    },

    language () {
      this.$forceUpdate()
    },
  },

  methods: {
    ...mapMutations('nico', ['setCode']),
    init () {
      // must wait for webfonts to finish loading, or else editor will be improperly initialized
      document.fonts.ready.then(() => {
        if (this.cm) this.cm.refresh()
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
@import '../../styles/defs.styl';

.editor .CodeMirror {
  height: 100%;
  border: 0;

  * {
    font-family: fonts.code;
    line-height: 1.1;
  }
}

.editor .CodeMirror-gutters {
  background: white;
  border-right: 0;
  width: 60px;
}
</style>
