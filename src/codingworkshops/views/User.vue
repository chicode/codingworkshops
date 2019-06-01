<template lang="pug">
.container(v-if="!$rest.loading")
  h1.no-margin {{ $rest.user.username }}
  p {{ $rest.user.bio }}
  div(v-if="$rest.user.projects.length")
    h2 Your Projects
    ProjectTiles(:projects="$rest.user.projects")

  div.mt-5
    div
      p.error(v-if="errors && errors.name") {{ errors.name[0] }}
      input.input(v-model="data.name" placeholder="name")
      select(v-model="data.language")
        option Blocks
        option Lisa
        option Python
    button.button.mt-1(@click="createProject"): div new project
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
        language: 'Blocks',
        get code () {
          return {
            Blocks: JSON.stringify([
              {
                type: 'callMars',
                func: 'rect',
                params: [
                  { type: 'literal', value: 1 },
                  { type: 'literal', value: 1 },
                  { type: 'literal', value: 10 },
                  { type: 'literal', value: 10 },
                ],
              },
            ]),
            Lisa: '(defunc draw ()\n  (rect 1 1 10 10))\n',
            Python: 'def draw():\n    rect(1, 1, 10, 10)\n',
          }[this.language]
        },
        spritesheet: '[]',
        tilesheet: '[]',
        flags: 'null',
        public: false,
      },
    }
  },
  rest: {
    user () {
      return ['user', { user: this.$route.params.user }]
    },
  },
  methods: {
    async createProject () {
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
