<template>
  <no-ssr>
    <div class="breadcrumb" :class="{collapse}">
      <nuxt-link
        v-if="breadcrumbs && breadcrumbs.length > 0"
        :to="localePath('index')"
        exact
        class="crumb"
      >
        <span>Home</span>
      </nuxt-link>

      <nuxt-link v-for="(path, key) in breadcrumbs" :key="key" :to="path.url" exact class="crumb">
        <span>{{ capitalize(path.label) }}</span>
      </nuxt-link>
    </div>
  </no-ssr>
</template>

<script>
const { capitalize } = require('~/assets/commonFunctions.js')

export default {
  props: {
    collapse: {
      default: false,
    },
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile
    },

    breadcrumbs() {
      return this.$store.state.breadcrumbs || []
    },
  },
  methods: { capitalize },
}
</script>

<style scoped lang="scss">
@import '~/assets/variables.scss';

.breadcrumb {
  background: $shade;
  border-bottom: 1px solid rgba($offwhite, 0.5);
  // margin-bottom: $unit * 3;
  padding: 0;
  width: 100%;
  white-space: nowrap;
  position: relative;
  position: relative;
  z-index: 3;
  overflow: hidden;
  flex-grow: 1;
  flex-shrink: 1;
  transition: all 0.2s;

  &.collapse {
    width: 0;
    flex-grow: 0;
  }

  & > * {
    z-index: 1;
  }

  &:after {
    @include fade-to-color(right, $shade);
    z-index: 2;
  }
}

.crumb {
  transition: all 0.2s;
  color: lighten($text, 25%) !important;
  position: relative;
  margin: 0;
  padding: $unit * 2 $unit * 4;
  color: $text;
  text-decoration: none;
  display: inline-block;

  &:hover {
    color: $text !important;
  }

  &:first-of-type {
    padding-left: $content-padding * 2;
    margin-left: $content-padding * -1;
  }

  & > * {
    position: relative;
    z-index: 4;
    white-space: nowrap;
  }

  &:before {
    transition: all 0.2s;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: skew(-25deg);
    border-right: 1px solid rgba($offwhite, 0.7);
    z-index: 3;
  }

  &:last-of-type:before {
    border-right: none;
  }

  &.gray0:not(:last-of-type)::before {
    // background: darken($shade, 8%);
  }
  &.gray1:not(:last-of-type)::before {
    // background: darken($shade, 4%);
  }

  &:not(:last-of-type)::before {
    // box-shadow: 4px 0 4px darken($shade, 5%);
  }

  &:hover::before {
    background: darken($shade, 3%) !important;
    // height: 108%;
    // top: -4%;
    z-index: 4;
    box-shadow: 0px 2px 10px darken($shade, 20%) !important;
  }
}
</style>
