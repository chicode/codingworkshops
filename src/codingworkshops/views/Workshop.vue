<template lang="pug">
.workshop.standard-layout
  query(
    :query="require('@/graphql/q/Workshop.gql')"
    :variables=`{
      workshop: $route.params.workshop,
      human: $route.params.human,
    }`
  )
    template(slot-scope="{ data: { workshop: { name, description }, workshopLessons } }")
      h1.name {{ name }}
      p.description {{ description }}
      LessonTiles.tiles(:lessons="workshopLessons")
</template>

<script>
import Query from '@/components/Query'
import LessonTiles from '../components/LessonTiles'

export default {
  name: 'Workshop',
  components: { Query, LessonTiles },
}
</script>
