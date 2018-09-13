<template>
  <div class="app">
    <Header />
    <!-- https://vuejs.org/v2/guide/components.html#Dynamic-Components -->
    <Game v-show="view === 'game'" />
    <Editor v-show="view === 'editor'" />
    <Sprite v-show="view === 'sprite'" />
  </div>
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
@import url('https://fonts.googleapis.com/css?family=Comfortaa:400,700|Karla:400')
@import '../styles/index.styl'

.app {
  margin: 30px;
}
</styles>
