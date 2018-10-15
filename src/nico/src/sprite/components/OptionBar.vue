<template lang="pug">
.option-bar(v-if="tool === 'pencil'")
  ColorPicker
  SizeSlider(:module='module')
.option-bar(v-else-if="tool === 'bucket'")
  ColorPicker
.option-bar(v-else-if="tool === 'eraser'")
  SizeSlider(:module='module')
</template>

<script>
import { mapState } from '../dynamic-helpers'

import ColorPicker from './ColorPicker'
import SizeSlider from './SizeSlider'

export default {
  name: 'OptionBar',

  components: {
    ColorPicker, SizeSlider,
  },

  props: {
    module: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapState('module', ['tool']),
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
