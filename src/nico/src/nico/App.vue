<template lang="pug">
.app
  header

  game(v-show="view === 'game'")
  editor(v-show="view === 'editor'")
  sprite(v-show="view === 'sprite'")
</template>

<script>
import { mapState } from 'vuex'

import Game from './components/Game'
import Editor from './components/Editor'
import Sprite from '../sprite/App'

import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Header, Game, Editor, Sprite,
  },
  computed: {
    ...mapState('nico', ['view']),
  },
}
</script>

<styles lang="stylus">
.app {
  margin: 30px;
}
</styles>
