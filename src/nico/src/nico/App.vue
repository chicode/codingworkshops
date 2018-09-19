<template lang="pug">
.app
  Header

  Game(v-if="showTabs.game" v-show="view === 'game'" :show-greeting="showGreeting")
  Editor(v-if="showTabs.editor" v-show="view === 'editor'" :language="language")
  Sprite(v-if="showTabs.sprite" v-show="view === 'sprite'")
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import Game from './components/Game'
import Editor from './components/Editor'
import Sprite from '../sprite/App'

import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Header, Game, Editor, Sprite,
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
      default: () => ({ game: true, sprite: true, editor: true }),
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
