<template lang="pug">
ul.mt-6.d-flex.flex-wrap.justify-content-center
  router-link.m-1.tile(
    style="width: 300px;"
    v-for="project in projects"
    tag="li"
    :key="project.name"
    :to=`{
      name: 'project',
      params: {
        user: $route.params.user,
        project: project.slug,
      }
    }`
  ): div
    h2.bold.no-margin {{ project.name }}

  li.empty(v-for='i in 20', :key='"empty_" + i')
</template>

<script>
export default {
  name: 'ProjectTiles',
  props: {
    projects: {
      type: Array,
      required: true,
    },
  },
}
</script>
