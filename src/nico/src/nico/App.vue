<template lang="pug">
.app
  Header

  Game(v-show="view === 'game'")
  Editor(v-show="view === 'editor'")
  Sprite(v-show="view === 'sprite'")
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
