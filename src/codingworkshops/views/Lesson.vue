<template>
  <div>
    lesson
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
    lesson: {
      query: require('@/graphql/q/Lesson_slides.gql'),
      variables () {
        console.log(this.$route)
        return {
          id: this.$route.params.id,
          workshop: this.$route.params.workshop,
        }
      },
      update: data => data.lesson.slides,
    },
  },
}
</script>

<style scoped lang="stylus">
</style>
