<template lang="pug">
.header
  .views
    button(v-for='iview in $options.VIEWS', :key='iview', :class="'button-2' + (view === iview ? ' active' : '')", @click='setView(iview)') {{ iview }}
  div
    button.button.run(@click='run')
      div run code
    button.button(:disabled='pauseDisabled', @click='togglePause')
      // ' ' + 'pause' + ' ' to stop eslint from complaining
      div {{ paused ? 'resume' : (' ' + 'pause' + ' ') }}
</template>

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
