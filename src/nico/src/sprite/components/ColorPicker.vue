<template lang="pug">
div.colorpicker
  div(
    v-for="color in $options.COLORS"
    :style="{ background: color }"
    :key="color"
    class="color"
    @click="setColor(color)"
  )
</template>

<script>
import { mapMutations, mapState } from '../dynamic-helpers'
import { COLORS } from '../constants'

export default {
  name: 'ColorPicker',

  COLORS,

  props: {
    module: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapState('module', ['color']),
  },

  methods: {
    ...mapMutations('module', ['setColor']),
  },
}
</script>

<style scoped lang="stylus">
@import '../../styles/defs.styl'

.colorpicker {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.color {
  width: 20px;
  height: 20px;
  standard-border()
}
</style>
