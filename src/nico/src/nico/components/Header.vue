<template lang="pug">
.header
  .views
    button(v-for='iview in $options.VIEWS' :key='iview' :class="'button-2' + (view === iview ? ' active' : '')" @click='setView(iview)')
      p(v-if='iview !== "settings"') {{ iview }}
      img(v-else src='../assets/settings.svg')
  div.buttons
    // super hacky way to make the button update on scroll
    // this is necessary because of a chromium bug (?) that stops position: absolute elements
    // from moving with the scroll when a parent's overflow is set to auto or scroll
    // TODO figure out a proper solution
    button.button.run(@click='run' :style='{ zIndex: buttonState ? 10 : 10 }')
      div run code
    button.button(:disabled='pauseDisabled' @click='togglePause' :style='{ zIndex: buttonState ? 10 : 10 }')
      // ' ' + 'pause' + ' ' to stop eslint from complaining
      div {{ paused ? 'resume' : (' ' + 'pause' + ' ') }}
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Header',
  VIEWS: ['game', 'editor', 'sprite', 'settings'],
  data: () => ({
    buttonState: false,
  }),
  computed: {
    ...mapGetters('nico', ['pauseDisabled']),
    ...mapState('nico', ['view', 'paused']),
  },
  methods: {
    ...mapMutations('nico', ['togglePause', 'setView']),
    ...mapActions('nico', ['run']),
  },
}
</script>

<style scoped lang="stylus">
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;

  .views {
    display: flex;
    align-items: center;
    & > * {
      margin-right: 10px;
    }
  }

  .buttons {
    display: flex;
  }

  .run {
    margin-right: 20px;
  }
}
</style>
