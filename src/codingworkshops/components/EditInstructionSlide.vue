<template lang="pug">
div.instruction-slide(v-if="!loading")
  div.instructions
    p.error(v-if='errors.editSlide.name') {{ errors.editSlide.name }}
    InputWrapper(:value='data.slide.name' @input='edit("name", $event)')
      h1.name {{ data.slide.name }}

    p.error(v-if='errors.editSlide.description') {{ errors.editSlide.description }}
    InputWrapper(:value='data.slide.description' @input='edit("description", $event)' :markdown='true')
      p.description.marked(v-marked='data.slide.description || "enter a description"')
    ul.directions
      h2 Directions
      Tiles.directions(:items='data.slide.directionSet' type='direction' :edit='true' :draggable='true' :router='false')
        template(slot-scope='{ item }')
          p.error(v-if='errors.editDirection.description') {{ errors.editDirection.description }}
          InputWrapper(:value='item.description' @input='editDirection(item)("description")($event)' :markdown='true')
            .text.marked(v-marked="item.description")

      p.error(v-if='errors.createDirection.description') {{ errors.createDirection.description }}
      MarkdownEditor.direction-input(placeholder='new direction' v-model='newDirectionDescription')
      button.button.create(@click='createDirection'): div create

  Nico(:show-greeting="false" language="Python" :script-boilerplate="false").nico
p(v-else) loading...
</template>

<script>
import Nico from '@/nico/src/nico/App'
import InputWrapper from '@/components/InputWrapper'
import MarkdownEditor from '@/components/MarkdownEditor'
import Tiles from './Tiles'
import { edit, create, apollo, data } from '@/edit-abstractions'

export default {
  name: 'EditInstructionSlide',
  components: { Nico, InputWrapper, Tiles, MarkdownEditor },
  data: () => ({
    ...data(['createDirection', 'editDirection', 'editSlide']),
    newDirectionDescription: '',
  }),
  apollo: { data: apollo('Slide') },
  methods: {
    edit: edit('Slide', {
      namespacedErrors: true,
    }),
    editDirection (item) {
      return edit('Direction', {
        getPk () {
          return item.id
        },
        namespacedErrors: true,
      }).bind(this)
    },
    createDirection: create('Direction', 'Slide', {
      getVars: function () {
        return { description: this.newDirectionDescription, hint: '', index: this.data.slide.directionSet.length + 1 }
      },
      onSuccess: function () {
        this.newDirectionDescription = ''
      },
      namespacedErrors: true,
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
.direction-input {
  .CodeMirror, .CodeMirror-scroll {
    min-height: 100px;
  }
}
</style>
