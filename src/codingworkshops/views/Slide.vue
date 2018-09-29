<template lang="pug">
div.full(v-if="!loading")
  div.lesson.full(v-if="slides.length")
    InstructionSlide.content.full
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
  name: 'Slide',
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
.lesson {
  display: flex;
  flex-direction: column;
}
</style>
