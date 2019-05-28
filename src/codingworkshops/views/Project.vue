<template lang="pug">
.full.d-flex.flex-column.justify-content-between(v-if="!$rest.loading && $rest.project.ok")
  Nico.p-5(:show-greeting="false" :projectData="this.$rest.project" :script-boilerplate="false")
  div.p-4.d-flex.justify-content-between.border-light.bt-only(style="height: 70px;")
    div
      router-link.mr-green(:to="{ name: 'home' }")
        span.text-blue coding
        span.text-purple workshops
    div.d-flex.align-items-start.mt-1
      button.button.mr-3(
        @click="save"
      ): div save
      button.button(
        @click="publish"
        :disabled="$rest.project.public"
      ): div publish

div(v-else-if="$rest.loading")
  p loading

div(v-else)
  p 404
</template>

<script>
import { mapGetters } from 'vuex'
import Nico from '@/nico/src/nico/App'

export default {
  name: 'Project',
  components: { Nico },
  rest: {
    project () {
      return ['userProject', this.$route.params]
    },
  },
  computed: {
    ...mapGetters('codingworkshops', ['projectData']),
  },
  methods: {
    save () {
      this.$methods.updateProject({ project: this.$rest.project.id }, { project: this.projectData })
    },
    publish () {
      this.$methods.updateProject(
        { project: this.$rest.project.id },
        {
          project: {
            public: true,
          },
        }
      )
    },
  },
}
</script>

<style lang="scss">
body,
html {
  height: 100%;
}
</style>
