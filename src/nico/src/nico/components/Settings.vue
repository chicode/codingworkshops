<template lang="pug">
div
  select(v-model="language")
    option(v-for="language in $options.LANGUAGES" :key="language") {{ language }}
</template>

<script>
import * as languages from '../languages'

export default {
  LANGUAGES: Object.keys(languages),
  name: 'Settings',
  computed: {
    language: {
      get () {
        return this.$store.state.nico.language.name
      },
      set (value) {
        return this.$store.dispatch('nico/setLanguage', value)
      },
    },
  },
}
</script>
