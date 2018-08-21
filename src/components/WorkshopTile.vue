<template>
  <router-link
    :to="{ name: 'workshop', params: { name: workshop.name } }"
    class="workshop"
    tag="li"
  >
    <h2>{{ workshop.name }}</h2>
    <p>{{ workshop.description }}</p>
  </router-link>
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
