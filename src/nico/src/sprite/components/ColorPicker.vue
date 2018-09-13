<template>
  <div class="colorpicker">
    <div
      v-for="color in $options.COLORS"
      :style="{ background: color }"
      :key="color"
      class="color"
      @click="setColor(color)"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { COLORS } from '../constants'

export default {
  name: 'ColorPicker',

  COLORS,

  computed: {
    ...mapState('sprite', ['color']),
  },

  methods: {
    ...mapMutations('sprite', ['setColor']),
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
