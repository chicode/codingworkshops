<template lang="pug">
.container(v-if="!$rest.loading")
  h1.no-margin {{ $rest.user.username }}
  p {{ $rest.user.bio }}
  div(v-if="$rest.user.workshops.length")
    h2 Your Workshops
    WorkshopTiles.workshops(:center='false' :workshops="$rest.user.workshops")

  div
    div
      p.error(v-if="errors.name") {{ errors.name[0] }}
      input.input(v-model="data.name" placeholder="name")

    div
      p.error(v-if="errors.description") {{ errors.description[0] }}
      input.input(v-model="data.description" placeholder="description")

    div
      p.error(v-if="errors.source_url") {{ errors.source_url[0] }}
      input.input(v-model="data.source_url" placeholder="source url")

    button.button.mt-3(@click="create"): div new workshop
</template>

<script>
import WorkshopTiles from '../components/WorkshopTiles.vue'

export default {
  name: 'User',
  components: { WorkshopTiles },
  data () {
    return {
      errors: {},
      data: {
        name: '',
        description: '',
        source_url: '',
      },
    }
  },
  rest: {
    user () {
      return ['user', this.$route.params]
    },
  },
  methods: {
    async create () {
      const { ok, errors, slug } = await this.$methods.createWorkshop({
        workshop: this.data,
      })
      if (ok) {
        this.$router.push({
          name: 'workshop',
          params: {
            user: this.$route.params.user,
            workshop: slug,
          },
        })
      } else {
        this.errors = errors
      }
    },
  },
}
</script>
