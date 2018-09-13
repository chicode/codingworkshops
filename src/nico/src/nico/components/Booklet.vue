<template>
  <div class="booklet">
    <button
      class="expand"
      @click="toggleExpand"
    >
      <img src="../assets/booklet.svg">
    </button>
    <div
      v-show="expanded"
      class="main"
    >
      <div
        ref="sectionsBuffer"
        class="sections-buffer"
      />
      <div
        ref="sections"
        class="sections"
      >
        <button
          v-for="isection in $options.BOOKLET_SECTIONS"
          :key="isection.title"
          :class="'button-2' + (isection.title === section.title ? ' active' : '')"
          @click="switchSection(isection)"
        >
          {{ isection.title }}
        </button>
      </div>
      <div class="content">
        <h2 class="title">{{ section.title }}</h2>
        <p>{{ section.description }}</p>

        <ul>
          <li
            v-for="function_ in section.functions"
            :key="function_.code"
            class="function"
          >
            <h3 class="code">{{ function_.code }}</h3>
            <p>{{ function_.description }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { BOOKLET_SECTIONS } from '../constants'

export default {
  name: 'Booklet',

  BOOKLET_SECTIONS,

  data: () => ({
    expanded: false,
    section: BOOKLET_SECTIONS[window.localStorage.getItem('booklet-section') || 0],
  }),

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
      window.localStorage.setItem('booklet-section', BOOKLET_SECTIONS.indexOf(this.section))
    },
    correctWidth () {
      if (this.$refs.sectionsBuffer) {
        // sets the sections buffer to the right width, so that enough space is given
        // for the position: absolute sections
        this.$refs.sectionsBuffer.style.flex = `1 0 ${this.$refs.sections.offsetHeight}px`
      }
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

.expand {
  background: white;
  pointer-events: all;

  align-self: flex-start;
  img {
    height: 50px;
  }
  padding: padding;
  light-border()
  border-top-left-radius: border-radius;
  border-bottom-left-radius: border-radius;
}

.main {
  background: white;
  pointer-events: all;

  display: flex;

  sections-height = 550px

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

    .title {
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
