import Vue from 'vue'
import marked from 'marked'

Vue.filter('marked', (value) => marked(value))
