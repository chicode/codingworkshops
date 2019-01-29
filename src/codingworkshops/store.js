import generateSet from '@/generateSet'

function setNamespacedVar (variable, value, { workshop, lesson, slide }) {
  window.localStorage.setItem([variable, workshop, lesson || '', slide || ''].join('~'), value)
}

function getNamespacedVar (variable, { workshop, lesson, slide }) {
  return window.localStorage.getItem([variable, workshop, lesson || '', slide || ''].join('~'))
}

export default {
  namespaced: true,
  state: {
    slides: [],
    slideIndex: 0,
    directionIndex: 0,
    loading: false,
  },
  getters: {
    slide (state) {
      return state.slides[state.slideIndex]
    },
    isFirstSlide (state) {
      return !state.slideIndex
    },
    isLastSlide (state) {
      return state.slideIndex === state.slides.length - 1
    },
    isSlideDone (state, getters) {
      return getters.slide && state.directionIndex === getters.slide.directions.length
    },
    routeContext: (_state, _getters, rootState) => (excludes = []) => {
      return ['human', 'workshop', 'lesson', 'slide']
        .filter((item) => !excludes.includes(item))
        .reduce((acc, val) => ({ ...acc, [val]: rootState.router.params[val] }), {})
    },
  },
  mutations: {
    ...generateSet(['slides', 'directionIndex', 'slideIndex', 'loading']),
  },
  actions: {
    setSlideIndex ({ getters, commit }, slideIndex) {
      commit('setSlideIndex', slideIndex)
      this.router.replace({
        name: 'slide',
        params: { ...getters.routeContext(), slide: slideIndex },
      })
      if (
        slideIndex >
        (parseInt(getNamespacedVar('slideIndex', getters.routeContext(['slide']))) || 0)
      ) {
        setNamespacedVar('slideIndex', slideIndex, getters.routeContext(['slide']) || 0)
      }
    },
    setInitialSlideIndex ({ getters, dispatch }, slideIndex) {
      // requested slide has been completed
      if (
        (parseInt(getNamespacedVar('slideIndex', getters.routeContext(['slide']))) || 0) >=
        slideIndex
      ) {
        dispatch('setSlideIndex', slideIndex)
      } else {
        dispatch('setSlideIndex', 0)
      }
      dispatch('setDirectionIndexFromStorage')
    },
    setDirectionIndex ({ getters, commit }, directionIndex) {
      commit('setDirectionIndex', directionIndex)
      setNamespacedVar('directionIndex', directionIndex, getters.routeContext())
    },
    setDirectionIndexFromStorage ({ getters, commit }) {
      commit(
        'setDirectionIndex',
        parseInt(getNamespacedVar('directionIndex', getters.routeContext())) || 0,
      )
    },

    nextSlide ({ dispatch, getters, state }) {
      if (getters.isLastSlide) {
        this.router.push({ name: 'workshop', params: getters.routeContext() })
      } else {
        dispatch('setSlideIndex', state.slideIndex + 1)
        dispatch('setDirectionIndexFromStorage')
      }
    },
    previousSlide ({ dispatch, state }) {
      dispatch('setSlideIndex', state.slideIndex - 1)
      dispatch('setDirectionIndexFromStorage')
    },
    nextDirection ({ dispatch, state }) {
      dispatch('setDirectionIndex', state.directionIndex + 1)
    },
    async fetchLesson ({ commit, getters }) {
      commit('setLoading', true)
      const { lesson, workshop } = getters.routeContext()
      const response = await this.$methods.lesson({
        lesson,
        workshop,
      })
      commit('setLoading', false)
      commit('setSlides', response.slides)
    },
  },
}
