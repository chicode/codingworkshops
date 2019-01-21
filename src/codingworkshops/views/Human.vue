<template lang="pug">
.human(v-if="!$rest.loading")
  h1.no-margin {{ $rest.user.username }}
  p {{ $rest.user.bio }}
  div(v-if="$rest.user.workshops.length")
    h2 Your Workshops
    WorkshopTiles.workshops(:center='false' :workshops="$rest.user.workshops")

  .new-workshop
    p.error(v-if="errors.name") {{ errors.name[0] }}
    input.input(v-model="workshop" placeholder="name")
    button.button(@click="create"): div new workshop
</template>

<script>
import { mapActions } from 'vuex'
import WorkshopTiles from '../components/WorkshopTiles.vue'

export default {
  name: 'Human',
  components: { WorkshopTiles },
  data () {
    return {
      errors: {},
      workshop: '',
    }
  },
  rest: {
    user () {
      return ['user', { user: this.$route.params.human }]
    },
  },
  methods: {
    ...mapActions('codingworkshops', ['enterEditMode']),

    create () {
      const { errors } = this.$post('/workshops')
      if (errors) {
        this.errors = errors
      } else {
        this.enterEditMode(this.workshop)
      }
    },
  },
}
</script>

<style scoped lang="stylus">
@import '~@/styles/defs'

.human {
  standard-layout()
}

.new-workshop {
  display: flex;
  margin-top: 50px;
  align-items: flex-end;
  .input {
    margin-right: 10px;
  }
}
</style>
