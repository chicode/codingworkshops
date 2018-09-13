<template>
  <div class="header">
    <div class="views">
      <button
        v-for="iview in $options.VIEWS"
        :key="iview"
        :class="'button-2' + (view === iview ? ' active' : '')"
        @click="setView(iview)"
      >{{ iview }}</button>
    </div>

    <div>
      <button
        class="button run"
        @click="run"
      ><div>run code</div></button>
      <button
        :disabled="pauseDisabled"
        class="button"
        @click="togglePause"
      ><div>{{ paused ? 'resume' : '&nbsp;pause&nbsp;' }}</div></button>

      <!-- nbsp exists in order to make button the same width between modes -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Header',
  VIEWS: ['game', 'editor', 'sprite'],
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
    & > * {
      margin-right: 10px;
    }
  }

  .run {
    margin-right: 20px;
  }
}
</style>
