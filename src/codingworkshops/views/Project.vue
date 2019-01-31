<template lang="pug">
.full.d-flex(v-if="!$rest.loading && $rest.project.ok")
  div
    h1 {{ $rest.project.name }}
    button(@click="save"): div save
    button(@click="publish"): div publish

  Nico(:show-greeting="false" language="Python" :script-boilerplate="false").nico

div(v-else-if="$rest.loading")
  p loading

div(v-else)
  p 404
</template>

<script>
import Nico from '@/nico/src/nico/App'

export default {
  name: 'Project',
  components: { Nico },
  rest: {
    project () {
      return ['userProject', this.$route.params]
    },
  },
  methods: {
    save () {},
    publish () {},
  },
}
</script>
