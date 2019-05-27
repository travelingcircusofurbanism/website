<template>
  <div class="tags sub" v-if="tags && tags.length > 0">
    <nuxt-link v-for="tag in tags" :key="tag" :to="`/tag/${tag}`" class="tag">#{{tag}}</nuxt-link>
  </div>
</template>

<script>
import { capitalize } from '~/assets/commonFunctions.js'

export default {
  props: ['tags'],
  methods: {
    capitalize,
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/variables.scss';

.tags {
  position: relative;
  top: $unit * -2;
}

.sub {
  opacity: 1;
}

.tag {
  // padding: $unit * 0.5 $unit * 1;
  // background: $shade;
  margin-right: $unit * 1;
  // text-decoration: none;
  color: $active !important;

  &:hover {
    text-decoration: underline;
  }
}
</style>
