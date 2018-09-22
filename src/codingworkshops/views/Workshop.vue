<template lang="pug">
.workshop.standard-layout
  query(
    :query="require('@/graphql/q/Workshop.gql')"
    :variables="{ workshop: $route.params.workshop }"
  )
    template(slot-scope="{ data: { workshop: { name, description, lessonSet } } }")
      h1.name {{ name }}
      p.description {{ description }}
      LessonTiles.tiles(:lessons="lessonSet")
</template>

<script>
import Query from '@/components/Query'
import LessonTiles from '../components/LessonTiles'

export default {
  name: 'Workshop',
  components: { Query, LessonTiles },
}
</script>
