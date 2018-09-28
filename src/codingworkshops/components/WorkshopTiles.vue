<template lang="pug">
ul.workshops
  router-link(
    v-for='workshop in workshops',
    :key='workshop.name'
    :to=`{
      name: edit ? 'edit-workshop' : 'workshop',
      params: {
        workshop: workshop.slug,
        human: workshop.author.username
      }
    }`
    tag="li"
  ): tile(:edit='edit' @del='del(workshop.id)')
      h2.bold.no-margin {{ workshop.name }}
      p {{ workshop.description }}

  // the empty elements help make the flex grid look
  // like it's a list despite it actually having justify-content: center
  li.empty(v-for='i in 20', :key='i')
</template>

<script>
import Tile from './Tile'

export default {
  name: 'WorkshopTiles',
  components: { Tile },
  props: {
    workshops: {
      type: Array,
      required: true,
    },
    edit: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    del (pk) {
      this.$apollo.mutate({
        mutation: require('@/graphql/m/DeleteWorkshop.gql'),
        variables: {
          pk,
        },
        refetchQueries: [{
          query: require('@/graphql/q/UserWorkshops.gql'),
          variables: {
            username: this.$route.params.human,
          },
        }],
      })
    },
  },
}
</script>

<style scoped lang="stylus">
@import '~@/styles/defs'

.workshops {
  margin-top: 50px;

  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .empty, .workshop {
    width: 300px;
    margin: 10px;
  }
}
</style>
