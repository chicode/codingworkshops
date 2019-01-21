<template lang='pug'>
div
  ImageEditor(module='tile' :show-grid='false' :show-color-picker='false')
  .tile-actions
    .canvas
      TileSelect
      TileSelectOverlay(ref='canvas')
    FlagPicker
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import ImageEditor from '../image-editor/App'
import TileSelect from './components/TileSelect'
import TileSelectOverlay from './components/TileSelectOverlay'
import FlagPicker from './components/FlagPicker'

export default {
  name: 'Tile',
  components: { ImageEditor, TileSelect, TileSelectOverlay, FlagPicker },
  mounted () {
    const el = this.$refs.canvas.$el
    const f = (e) => [e.offsetY, e.offsetX]
    el.addEventListener('mousedown', (event) => this.mouseDown(f(event)))
    el.addEventListener('mousemove', (event) => this.mouseMove(f(event)))
    el.addEventListener('mouseup', this.mouseUp)
    el.addEventListener('mouseleave', this.mouseLeave)
    this.startSelect([0, 0])
  },
  methods: {
    ...mapActions('tile/tileSelect', ['mouseDown', 'mouseUp', 'mouseMove', 'mouseLeave']),
    ...mapMutations('tile/tileSelect', ['startSelect']),
  },
}
</script>;

<style scoped lang="stylus">
@import '../image-editor/layered-canvas';
.canvas {
  canvas {
    // TODO: compute this number automatically
    margin-top: -800px;
  }
  canvas:last-child {
    border: 2px solid black;
  }
}
</style>
