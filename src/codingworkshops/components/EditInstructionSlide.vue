<template lang="pug">
div.instruction-slide(v-if="!loading")
  div.instructions
    InputWrapper(:value='data.slide.name' @input='edit("name")($event)')
      h1.name {{ data.slide.name }}
    InputWrapper(:value='data.slide.description' @input='edit("description")($event)')
      p.description.marked(v-marked='data.slide.description || "enter a description"')
    ul.directions
      h2 Directions
      Tiles(:items='data.slide.directionSet' type='direction' :edit='true' :draggable='true' :router='false')
        template(slot-scope='{ item }')
          InputWrapper(:value='item.description' @input='editDirection("description")($event)')
            p.text.marked(v-marked="item.description")

      input(placeholder='new direction' v-model='newDirectionDescription')
      button.button(@click='create'): div create

  Nico(:show-greeting="false" language="Python" :script-boilerplate="false").nico
p(v-else) loading...
</template>

<script>
import Nico from '@/nico/src/nico/App'
import InputWrapper from '@/components/InputWrapper'
import Tiles from './Tiles'
import { edit, create, apollo, data } from '@/edit-abstractions'

export default {
  name: 'EditInstructionSlide',
  components: { Nico, InputWrapper, Tiles },
  data: () => ({
    ...data(),
    newDirectionDescription: '',
  }),
  ...apollo('slide'),
  methods: {
    ...edit('slide'),
    ...edit('direction', { namespaced: true }),
    ...create('direction', 'slide', {
      getVars: function () {
        return { description: this.newDirectionDescription, hint: '', index: this.data.slide.directionSet.length + 1 }
      },
    }),
  },
}
</script>

<style scoped lang="stylus">
@import './InstructionSlide.styl'
</style>
