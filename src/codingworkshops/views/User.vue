<template lang="pug">
.container(v-if="!$rest.loading")
  h1.no-margin {{ $rest.user.username }}
  p {{ $rest.user.bio }}
  div(v-if="$rest.user.projects.length")
    h2 Your Projects
    ProjectTiles(:projects="$rest.user.projects")

  div.mt-5
    div
      p.error(v-if="errors.name") {{ errors.name[0] }}
      input.input(v-model="data.name" placeholder="name")
    button.button.mt-1(@click="create"): div new project
</template>

<script>
import ProjectTiles from '../components/ProjectTiles.vue'

export default {
  name: 'User',
  components: { ProjectTiles },
  data () {
    return {
      errors: {},
      data: {
        name: '',
      },
    }
  },
  rest: {
    user () {
      return ['user', { user: this.$route.params.user }]
    },
  },
  methods: {
    async create () {
      const { ok, errors, slug } = await this.$methods.createProject({
        project: this.data,
      })
      if (ok) {
        this.$router.push({
          name: 'project',
          params: {
            user: this.$route.params.user,
            project: slug,
          },
        })
      } else {
        this.errors = errors
      }
    },
  },
}
</script>
