<template lang="pug">
ul.workshops(:class="center && 'center'")
  router-link(
    v-for="workshop in workshops"
    tag="li"
    :key="workshop.name"
    :to=`{
      name: 'workshop',
      params: {
        human: workshop.author.username,
        workshop: workshop.slug,
      }
    }`
  )
    h2.bold.no-margin {{ workshop.name }}
    p {{ workshop.description }}

  // the empty elements help make the flex grid look
  // like it's a list despite it actually having justify-content: center
  // empty_ + i in order to avoid key duplication
  li.empty(v-for='i in 20', :key='"empty_" + i')
</template>

<script>
export default {
  name: 'WorkshopTiles',
  props: {
    workshops: {
      type: Array,
      required: true,
    },
    center: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
}
</script>

<style lang="stylus">
@import '~@/styles/defs'

.workshops {
  margin-top: 30px;

  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;

  &.center {
    justify-content: center;
  }
  &:not(.center) {
    margin-left: -10px;
  }

  > * {
    width: 300px;
    margin: 10px;
  }
}
</style>
