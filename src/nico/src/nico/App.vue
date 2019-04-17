<template lang="pug">
.app
  Header(:show-tabs='showTabs')

  Game(v-if="showTabs.game" v-show="view === 'game'" :show-greeting="showGreeting")
  Editor(v-if="showTabs.editor && editorMode == 'code'" v-show="view === 'editor'" :language="language")
  BlockEditor(v-if="showTabs.editor && editorMode == 'block'" v-show="view === 'editor'")
  Sprite(v-if="showTabs.sprite" v-show="view === 'sprite'")
  Tile(v-if="showTabs.tile" v-show="view === 'tile'")
  Settings(v-if="showTabs.settings" v-show="view === 'settings'")
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import Game from './components/Game'
import Editor from './components/Editor'
import BlockEditor from './components/BlockEditor'
import Settings from './components/Settings'
import Sprite from '../sprite/App'
import Tile from '../tile/App'

import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Header,
    Game,
    Editor,
    Sprite,
    Settings,
    Tile,
    BlockEditor,
  },
  props: {
    showGreeting: {
      type: Boolean,
      required: false,
      default: true,
    },
    showTabs: {
      type: Object,
      required: false,
      default: () => ({
        game: true,
        editor: true,
        sprite: true,
        tile: true,
        settings: false,
      }),
    },
    language: {
      type: String,
      required: true,
    },
    editorMode: {
      type: String,
      required: true,
    },
    scriptBoilerplate: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    ...mapState('nico', ['view']),
  },
  mounted () {
    this.setLanguage(this.language)
    if (this.scriptBoilerplate) this.loadBoilerplate()
  },
  methods: {
    ...mapMutations('nico', ['loadBoilerplate']),
    ...mapActions('nico', ['setLanguage']),
  },
}
</script>
