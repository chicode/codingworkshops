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
    <slot />
  </div>
</template>

<script>
export default {
  name: 'InstructionSlide',
  props: {
    slide: {
      type: Object,
      required: true,
    },
  },
}
</script>
