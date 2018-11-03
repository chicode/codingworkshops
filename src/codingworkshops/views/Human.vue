<template lang="pug">
.human(v-if="!loading")
  h1.no-margin {{ data.user.username }}
  p {{ data.user.bio }}
  div(v-if="data.userWorkshops.length")
    h2 Your Workshops
    WorkshopTiles.workshops(:edit='true' :center='false' :workshops="data.userWorkshops")
  div(v-if="data.user.contributedWorkshopSet.length")
    h2 Workshops You Contribute To
    WorkshopTiles.workshops(:edit='true' :center='false' :workshops="data.user.contributedWorkshopSet")

  .new-workshop
    p.error(v-if="errors.name") {{ errors.name }}
    input.input(v-model="workshop" placeholder="name")
    button.button(@click="create"): div new workshop
</template>

<script>
import { mapActions } from 'vuex'

import Query from '@/components/Query'
import WorkshopTiles from '../components/WorkshopTiles.vue'
import { create, apollo, data } from '@/edit-abstractions'

export default {
  name: 'Human',
  components: { Query, WorkshopTiles },
  data: () => ({
    ...data(),
    workshop: '',
    errors: '',
  }),
  apollo: { data: apollo('User') },
  methods: {
    ...mapActions('codingworkshops', ['enterEditMode']),
    create: create('workshop', null, {
      getVars () {
        return { name: this.workshop }
      },
      onSuccess () {
        this.enterEditMode(this.workshop)
      },
    }),
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
