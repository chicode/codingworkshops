<template lang="pug">
div.footer
  div.breadcrumbs
    router-link(:to=`{ name: 'human',
      params: {
        human: $route.params.human
      }
    }`)
      span.accent-1 {{ $route.params.human }}
    router-link.workshop(:to=`{
      name: 'edit-workshop',
      params: {
        human: $route.params.human,
        workshop: $route.params.workshop,
      }
    }`) {{ $route.params.workshop }}
    router-link(:to=`{
      name: 'edit-lesson',
      params: {
        human: $route.params.human,
        workshop: $route.params.workshop,
        lesson: $route.params.lesson,
      }
    }`) {{ $route.params.lesson }}
  div.buttons
    button.button(
      :disabled="isFirstSlide"
      @click="previousSlide"
    ): div previous
    button.button(
      :disabled="isLastSlide"
      @click="nextSlide"
    ): div next
</template>

<script>
export default {
  name: 'EditSlideFooter',
  props: {
    isFirstSlide: {
      type: Boolean,
      required: true,
    },
    isLastSlide: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    nextSlide () {
      this.$router.push({ name: 'edit-slide',
        params: {
          ...this.$route.params,
          slide: parseInt(this.$route.params.slide) + 1,
        },
      })
    },
    previousSlide () {
      this.$router.push({ name: 'edit-slide',
        params: {
          ...this.$route.params,
          slide: parseInt(this.$route.params.slide) - 1,
        },
      })
    },
  },
}
</script>

<style scoped lang="stylus">
@import './SlideFooter'
</style>
