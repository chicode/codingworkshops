
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
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'ColorPicker',

  COLORS: ['red'],

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
