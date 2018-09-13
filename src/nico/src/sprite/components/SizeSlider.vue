<template lang="pug">
  input(
    :min="$options.MIN_TOOL_WIDTH"
    :max="$options.MAX_TOOL_WIDTH"
    :value="width"
    type="range"
    class="sizeslider"
    @input="event => setWidth(event.target.value)"
  )
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { MIN_TOOL_WIDTH, MAX_TOOL_WIDTH } from '../constants'

export default {
  name: 'SizeSlider',

  MIN_TOOL_WIDTH,
  MAX_TOOL_WIDTH,

  computed: {
    ...mapState('sprite', ['width']),
  },

  methods: {
    ...mapMutations('sprite', ['setWidth']),
  },
}
</script>

<style scoped lang="stylus">
.sizeslider {
  max-width: 200px;
  height: 100%;
}
</style>
