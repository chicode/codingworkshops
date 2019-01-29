<template lang="pug">
.container(v-if="!$rest.loading")
  h1 {{ $rest.workshop.name }}
  p {{ $rest.workshop.description }}
  button.button(v-if="isOwner" @click="load"): div load from source
  p(v-if="success") success!
  p(v-else-if="error") {{ error }}
  LessonTiles(:lessons="$rest.workshop.lessons")
</template>

<script>
import LessonTiles from '../components/LessonTiles'

export default {
  name: 'Workshop',
  components: { LessonTiles },
  data () {
    return { success: false, error: '' }
  },
  rest: {
    workshop () {
      return [
        'workshop',
        {
          workshop: this.$route.params.workshop,
        },
      ]
    },
  },
  computed: {
    isOwner () {
      return parseInt(localStorage.getItem('id')) === this.$rest.workshop.author.id
    },
  },
  methods: {
    async load () {
      const { ok, error } = await this.$methods.loadWorkshop(
        { workshop: this.$rest.workshop.id },
        {},
      )
      if (ok) {
        this.success = true
      } else {
        this.error = error
      }
    },
  },
}
</script>
