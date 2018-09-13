<template lang="pug">
  router-link(
    :to=`{ name: 'workshop', params: { workshop: workshop.name } }`
    class="workshop"
    tag="li"
  )
    div
      h2.bold {{ workshop.name }}
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
 tile('tile', palette.light-purple);
  padding: 20px;

  h2 {
    font-size: font-sizes[2];
    font-weight: bold;
  }
  p {
    font-size: font-sizes[3];
  }
}
</style>
