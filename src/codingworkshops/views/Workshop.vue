<template>
  <Query
    :query="require('@/graphql/q/Workshop.gql')"
    :variables="{ workshop: $route.params.workshop }"
    class="root"
  >
    <template
      slot-scope="{ data: { workshop: { name, description, lessonSet } } }"
    >
      <h1>{{ name }}</h1>
      <p>{{ description }}</p>
      <LessonTiles :lessons="lessonSet" />
    </template>
  </Query>
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
</style>
