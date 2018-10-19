<template lang="pug">
.edit-lesson.standard-layout(v-if='!loading')
  router-link.workshop.underline(:to=`{
    name: 'edit-workshop',
    params: {
      human: $route.params.human,
      workshop: $route.params.workshop,
    }
  }`) {{ $route.params.workshop }}

  p.error(v-if='errors.name') {{ errors.name }}
  InputWrapper(:value='data.lesson.name' @input='edit("name")($event)')
    h1 {{ data.lesson.name }}

  p.error(v-if='errors.description') {{ errors.description }}
  InputWrapper(:value='data.lesson.description' @input='edit("description")($event)' :markdown='true')
    p(v-marked="data.lesson.description || 'enter a description'")

  SlideTiles(:edit='true' :slides='data.lessonSlides')
  button.button(@click='create'): div new slide
p(v-else) loading...
</template>

<script>
import InstructionSlide from '../components/InstructionSlide'
import SlideTiles from '../components/SlideTiles'
import InputWrapper from '@/components/InputWrapper'
import { edit, create, apollo, data } from '@/edit-abstractions'

export default {
  name: 'EditLesson',
  components: { InstructionSlide, SlideTiles, InputWrapper },
  data: () => ({
    ...data(),
    data: {
      lesson: {
        name: '',
        description: '',
        id: '',
      },
      lessonSlides: [],
    },
  }),
  ...apollo('lesson'),
  methods: {
    edit: edit('lesson'),
    create: create('slide', 'lesson', {
      onSuccess: function () {
        this.$router.push({ name: 'edit-slide',
          params: {
            ...this.$route.params,
            slide: this.data.lessonSlides.length + 1,
          },
        })
      },
    }),
  },
}
</script>

<style scoped lang="stylus">
.lesson {
  display: flex;
  flex-direction: column;
}
</style>
