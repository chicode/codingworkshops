<template lang="pug">
div.instruction-slide(v-if="!loading")
  div.instructions
    InputWrapper(:value='data.slide.name' @input='edit("name")($event)')
      h1.name {{ data.slide.name }}
    InputWrapper(:value='data.slide.description' @input='edit("description")($event)')
      p.description.marked(v-marked='data.slide.description || "enter a description"')
    ul.directions
      h2 Directions
      li.direction(
        v-for="{ description } in data.slide.directionSet"
        :key="description"
      )
        InputWrapper(:value='description' @input='editDirection("description")($event)')
          p.text.marked(v-marked="description")

      input(placeholder='new direction' v-model='newDirectionDescription')
      button.button(@click='create'): div create

  Nico(:show-greeting="false" language="Python" :script-boilerplate="false").nico
p(v-else) loading...
</template>

<script>
import Nico from '@/nico/src/nico/App'
import InputWrapper from '@/components/InputWrapper'
import { edit, create, apollo, data } from '@/edit-abstractions'

export default {
  name: 'InstructionSlide',
  components: { Nico, InputWrapper },
  data: () => ({
    ...data(),
    newDirectionDescription: '',
  }),
  ...apollo('slide'),
  methods: {
    ...edit('slide'),
    ...edit('direction', true),
    ...create('direction', 'slide', null, function () {
      return { description: this.newDirectionDescription }
    }),
  },
}
</script>

<style scoped lang="stylus">
@import './InstructionSlide.styl'
</style>
