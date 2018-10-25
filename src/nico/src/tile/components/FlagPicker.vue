<template lang="pug">
div.flagpicker
  p Flags:
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
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  p {
    margin-right: 30px;
  }
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
