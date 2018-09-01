<template>
  <div>
  </div>
</template>

<script>
import Query from '@/components/Query'

export default {
  name: 'Lesson',
  components: { Query },
  data: function () {
    return {
      slides: [],
    }
  },
  apollo: {
    query: require('@/graphql/q/Lesson_slides.gql'),
    update: data => data.lesson.slides,
  },
}
</script>

<style scoped lang="stylus">
</style>
