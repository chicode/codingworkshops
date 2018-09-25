<template lang="pug">
router-link.workshop.tile(
  :to=`{
    name: 'workshop',
    params: {
      workshop: workshop.slug,
      human: workshop.author.username
    } }
  `
  tag="li"
)
  div
    h2.bold.no-margin {{ workshop.name }}
    p {{ workshop.description }}
</template>

<script>
export default {
  name: 'WorkshopTile',
  props: {
    workshop: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped lang="stylus">
@import '~@/styles/defs'

.workshop {
  h2 {
    font-size: font-sizes[2];
    font-weight: bold;
  }
  p {
    font-size: font-sizes[3];
  }
}
</style>
