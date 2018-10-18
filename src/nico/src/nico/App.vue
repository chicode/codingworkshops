<template lang="pug">
.app
  Header(:show-tabs='showTabs')

  Game(v-if="showTabs.game" v-show="view === 'game'" :show-greeting="showGreeting")
  Editor(v-if="showTabs.editor" v-show="view === 'editor'" :language="language")
  Sprite(v-if="showTabs.sprite" v-show="view === 'sprite'")
  Tile(v-if="showTabs.tile" v-show="view === 'tile'")
  Settings(v-if="showTabs.settings" v-show="view === 'settings'")
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import Game from './components/Game'
import Editor from './components/Editor'
import Settings from './components/Settings'
import Sprite from '../sprite/App'
import Tile from '../tile/App'

import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Header, Game, Editor, Sprite, Settings, Tile,
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
      default: () => ({ game: true, sprite: true, editor: true, tile: true, settings: false }),
    },
    language: {
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
    ...mapMutations('nico', ['setLanguage', 'loadBoilerplate']),
  },
}
</script>
