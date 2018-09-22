<template lang="pug">
.workshop
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

<style scoped lang="stylus">
@import '~@/styles/defs'

.workshop {
  standard-layout()
}

.description {
  margin-top: 10px;
}

.tiles {
  margin-top: 50px;
}

</style>
