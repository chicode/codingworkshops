<template lang="pug">
div.instruction-slide(v-if="!loading")
  div.instructions
    InputWrapper(:value='data.slide.name' @input='edit("name")($event)')
      h1.name {{ data.slide.name }}
    InputWrapper(:value='data.slide.description' @input='edit("description")($event)')
      p.description.marked(v-marked='data.slide.description || "enter a description"')
    ul.directions
      h2 Directions
      Tiles.directions(:items='data.slide.directionSet' type='direction' :edit='true' :draggable='true' :router='false')
        template(slot-scope='{ item }')
          InputWrapper(:value='item.description' @input='editDirection(item)("description")($event)')
            .text.marked(v-marked="item.description")

      input.input.direction-input(placeholder='new direction' v-model='newDirectionDescription')
      button.button.create(@click='create'): div create

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
    editDirection (item) {
      return edit('direction', {
        getPk () {
          return item.id
        },
      }).edit.bind(this)
    },
    ...create('direction', 'slide', {
      getVars: function () {
        return { description: this.newDirectionDescription, hint: '', index: this.data.slide.directionSet.length + 1 }
      },
      onSuccess: function () {
        this.newDirectionDescription = ''
      },
    }),
  },
}
</script>

<style scoped lang="stylus">
@import './InstructionSlide.styl'
.direction-input {
  margin-top: 50px;
  margin-bottom: 30px;
}
</style>

<style lang="stylus">
.directions {
  margin-top: 50px;
  li {
    margin-bottom: 20px;
  }
}
</style>
