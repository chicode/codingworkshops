<template>
  <ul class="workshops">
    <WorkshopTile
      v-for="workshop in workshops"
      :workshop="workshop"
      :key="workshop.title"
      class="workshop"
    />
    <!-- the empty elements help make the flex grid look -->
    <!-- like it's a list despite it actually having justify-content: center -->
    <div
      v-for="i in 20"
      :key="i"
      class="empty"
    />
  </ul>
</template>

<script>
import WorkshopTile from '@/components/WorkshopTile'

export default {
  name: 'WorkshopTiles',
  components: { WorkshopTile },
  props: {
    workshops: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped lang="stylus">
@import '~@/styles/defs'
.workshops {

  align-items: flex-start;
  margin-top: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .empty, .workshop {
    width: 300px;
    margin: 10px;
  }

  .empty {
    height: 0;
  }
}
</style>
