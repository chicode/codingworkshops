<template>
  <div>
    <div class="instruction-slide">
      <h1>{{ slide.name }}</h1>
      <p>{{ slide.description }}</p>
      <ul>
        <li
          v-for="{ description } in slide.directions"
          :key="description"
        >
          {{ description }}
        </li>
      </ul>
    </div>
    <Nico />
  </div>
</template>

<script>
import Nico from '@/nico/src/nico/App'

export default {
  name: 'InstructionSlide',
  components: { Nico },
  props: {
    slide: {
      type: Object,
      required: true,
    },
  },
}
</script>
