import Vue from 'vue'
import marked from 'marked'

Vue.directive('click-outside', {
  bind (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his childrens
      if (!(el === event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        binding.value(event)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
})

Vue.directive('marked', (el, binding) => {
  el.innerHTML = marked(binding.value, { sanitize: true })
})
