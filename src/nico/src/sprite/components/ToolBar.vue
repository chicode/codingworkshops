<template>
  <div class="toolbar">
    <!-- see nico/App.vue for definition of no-interaction -->
    <div class="tools no-interaction">
      <button
        v-for="itool in $options.TOOLS"
        :key="itool"
        :class="itool"
        @click="setTool(itool)"
      >
        <img :src="`icons/tools/${itool}${itool === tool ? '-active' : ''}.svg`">
      </button>
      <button
        class="clear"
        @click="clear"
      >
        <img src="icons/clear.svg">
      </button>
      <button
        @click="undo"
      >
        <img src="icons/undo.svg">
      </button>
      <button
        @click="redo"
      >
        <img src="icons/redo.svg">
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import { TOOLS } from '../constants'

export default {
  name: 'ToolBar',

  TOOLS,

  computed: {
    ...mapState('sprite', ['tool']),
  },

  methods: {
    ...mapMutations('sprite', ['setTool']),
    ...mapActions('history', ['undo', 'redo']),
    ...mapActions('sprite/sprite', ['clear']),
  },
}
</script>

<style scoped lang="stylus">
button img {
  height: 30px;
}

.toolbar {
  display: flex;
}

.tools {
  display: flex;
  align-items: center;

  .bucket, .circle-select {
    margin-right: 30px;
  }

  & > * {
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
