<template lang="pug">
ul.workshops.mt-6.d-flex.flex-wrap.justify-content-center(:class="center && 'center'")
  router-link.m-1.tile(
    style="width: 300px;"
    v-for="workshop in workshops"
    tag="li"
    :key="workshop.name"
    :to=`{
      name: 'workshop',
      params: {
        user: workshop.author.username,
        workshop: workshop.slug,
      }
    }`
  ): div
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
