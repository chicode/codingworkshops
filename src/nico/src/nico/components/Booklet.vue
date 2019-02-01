<template lang="pug">
.booklet
  button.expand(@click='toggleExpand')
    img(src='../assets/booklet.svg')
  .main(v-show='expanded')
    .sections-buffer(ref='sectionsBuffer')
    .sections(ref='sections')
      button(v-for='isection in $options.FUNCTIONS', :key='isection.name', :class="'button-2' + (isection.name === section.name ? ' active' : '')", @click='switchSection(isection)')
        | {{ isection.name }}
    .content
      h2.name {{ section.name }}
      p {{ section.description }}
      ul
        li.function(v-for='(function_, i) in section.functions', :key='i')
          h3.code {{ getSyntax(function_) }}
          p {{ function_.description }}
</template>

<script>
import { mapState } from 'vuex'
import { FUNCTIONS } from '../constants'

export default {
  name: 'Booklet',

  FUNCTIONS,

  data () {
    return {
      expanded: false,
      section: FUNCTIONS[window.localStorage.getItem('booklet-section') || 0],
    }
  },

  computed: {
    ...mapState('nico', ['language']),
  },

  mounted () {
    this.correctWidth()
  },

  updated () {
    this.correctWidth()
  },

  methods: {
    toggleExpand () {
      this.expanded = !this.expanded
    },
    switchSection (section) {
      this.section = section
      window.localStorage.setItem('booklet-section', FUNCTIONS.indexOf(this.section))
    },
    correctWidth () {
      if (this.$refs.sectionsBuffer) {
        // sets the sections buffer to the right width, so that enough space is given
        // for the position: absolute sections
        this.$refs.sectionsBuffer.style.flex = `1 0 ${this.$refs.sections.offsetHeight}px`
      }
    },
    getSyntax (data) {
      return this.language.getSyntax(data)
    },
  },
}
</script>

<style scoped lang="stylus">
@import '../../styles/defs.styl'

padding = 10px

.booklet {
  position: fixed;
  right: 0;
  display: flex;

  p {
    font-size: font-sizes[3];
  }

  // make the booklet rise above codemirror
  z-index: 10;

  // allow clicking through section below expand button
  pointer-events: none;
}

h3 {
  font-size: font-sizes[1];
}

.expand {
  background: white;
  pointer-events: all;
  cursor: pointer;

  align-self: flex-start;
  img {
    height: 50px;
  }
  padding: padding;
  light-border()
  border-top-left-radius: borders.light.radius;
  border-bottom-left-radius: borders.light.radius;
}

.main {
  background: white;
  pointer-events: all;

  display: flex;

  sections-height = 730px

  .sections-buffer {
    // width: set by js
    height: sections-height;
  }

  .sections {
    light-border()
    margin-left: -2px;

    padding: padding;
    display: flex;
    position: absolute;
    transform: rotateZ(-90deg) translateX(-1 * sections-height);
    transform-origin: top left;
    width: sections-height;
    justify-content: flex-end;

    & > * {
      margin-left: 40px;
    }
  }

  .content {
    width: 700px;
    light-border()
    padding: padding;
    margin-left: -4px;

    .name {
      margin: 10px 0;
    }

    .code {
      margin-top: 20px;
      margin-bottom: 5px;

      // make the background stretch all the way across
      padding: 0 padding;
      margin-left: -1 * padding;
      margin-right: -1 * padding;
    }
  }
}

.function {
  .code {
    background: colors.light-background;
    font-family: fonts.code;
  }
}
</style>
