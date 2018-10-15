<template lang="pug">
.toolbar
  // see nico/App.vue for definition of no-interaction
  .tools.no-interaction
    button(v-for='itool in $options.TOOLS', :key='itool', :class='itool', @click='setTool(itool)')
      // the require here is necessary because otherwise webpack won't know that the dynamic asset exists
      img(:src="require(`../assets/${itool}${itool === tool ? '-active' : ''}.svg`)")
    button.clear(@click='clear')
      img(src='../assets/clear.svg')
    button(@click='undo')
      img(src='../assets/undo.svg')
    button(@click='redo')
      img(src='../assets/redo.svg')
</template>

<script>
import { mapMutations, mapActions, mapState } from '../dynamic-helpers'
import { TOOLS } from '../constants'

export default {
  name: 'ToolBar',

  TOOLS,

  props: {
    module: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapState('module', ['tool']),
  },

  methods: {
    ...mapMutations('module', ['setTool']),
    ...mapActions(function () {
      return `${this.module}-history`
    }, ['undo', 'redo']),
    ...mapActions('module', ['clear'], ['sprite']),
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
