<template lang="pug">
div(v-if="!loading")
  div.root(v-if="slides.length")
    InstructionSlide.content
    SlideFooter.footer
  div(v-else) no slides!

div(v-else)
  p loading
</template>

<script>
import { mapActions, mapState } from 'vuex'

import InstructionSlide from '../components/InstructionSlide'
import SlideFooter from '../components/SlideFooter'

export default {
  name: 'Lesson',
  components: { InstructionSlide, SlideFooter },
  computed: {
    ...mapState('codingworkshops', ['slides', 'loading']),
  },
  mounted () {
    this.fetchLesson()
    this.setInitialSlideIndex(parseInt(this.$route.params.slide))
  },
  methods: {
    ...mapActions('codingworkshops', ['fetchLesson', 'setInitialSlideIndex']),
  },
}
</script>

<style scoped lang="stylus">
.content {
  height: 92vh;
}
</style>
