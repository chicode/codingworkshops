<template lang="pug">
Query(
  :query="require('@/graphql/q/Workshop.gql')"
  :variables="{ workshop: $route.params.workshop }"
  class="root"
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

<style scoped lang="stylus">
.root {
  margin: 100px 100px;
}

.description {
  margin-top: 10px;
}

.tiles {
  margin-top: 50px;
}

</style>
