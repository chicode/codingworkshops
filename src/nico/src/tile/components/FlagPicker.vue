<template lang="pug">
div.flagpicker
  button.flag(
    v-for="(flag, i) in currentFlags"
    :key="i"
    :class="flag && 'active'"
    @click="toggleFlag(i)"
  )
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { FLAG_NUMBER } from '../constants'

export default {
  name: 'FlagPicker',

  FLAG_NUMBER,

  computed: {
    ...mapGetters('tile', ['currentFlags']),
  },

  methods: {
    ...mapActions('tile', ['toggleFlag']),
  },
}
</script>

<style scoped lang="stylus">
@import '../../styles/defs.styl'

.flagpicker {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.flag {
  width: 20px;
  height: 20px;
  standard-border()
  &.active {
    background: palette.purple;
  }
}
</style>
