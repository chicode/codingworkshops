<template lang="pug">
.option-bar(v-if="tool === 'pencil'")
  ColorPicker
  SizeSlider
.option-bar(v-else-if="tool === 'bucket'")
  ColorPicker
.option-bar(v-else-if="tool === 'eraser'")
  SizeSlider
</template>

<script>
import { mapState } from 'vuex'

import ColorPicker from './ColorPicker'
import SizeSlider from './SizeSlider'

export default {
  name: 'OptionBar',

  components: {
    ColorPicker, SizeSlider,
  },

  computed: {
    ...mapState('sprite', ['tool']),
  },
}
</script>

<style scoped lang="stylus">
.option-bar {
  // prevent colorpicker from being shortened
  flex: 1;

  margin-left: 50px;
  display: flex;
  align-items: center;

  & > * {
    margin-right: 30px;
  }
}
</style>
