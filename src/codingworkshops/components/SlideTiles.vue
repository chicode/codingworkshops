<template lang="pug">
ul.slides
  router-link(
    v-for="slide in slides"
    tag="li"
    :key="slide.name"
    :to=`{
      name: 'slide',
      params: Object.assign($route.params, {
        slide: slide.index
      })
    }`
  )
    h2.no-margin {{ slide.name }}

  // the empty elements help make the flex grid look
  // like it's a list despite it actually having justify-content: center

  // empty_ + i in order to avoid key duplication
  li.empty(v-for='i in 20', :key='"empty_" + i')
</template>

<script>
export default {
  name: 'SlideTiles',
  props: {
    slides: {
      type: Array,
      required: true,
    },
    edit: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style lang="stylus">
@import '~@/styles/defs';

.slides {
  margin: 50px 0;

  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  li {
    width: 300px;
    margin: 10px;
  }
}
</style>
