<template>
  <div
    v-if="isMobile === false && breadcrumbs && breadcrumbs.length > 0"
    class="breadcrumb content-top-full"
  >
    <nuxt-link
      v-for="(path, key) in pathEls"
      :key="key"
      :to="path.url"
      exact
      class="crumb"
      :class="(key === pathEls.length - 1 ? 'last ' : '') + `gray${key}`"
    >
      <span>{{ capitalize(path.label) }}</span>
    </nuxt-link>
  </div>
</template>

<script>
const { capitalize, softTruncate } = require('~/assets/commonFunctions.js')

export default {
  props: {
    title: {
      required: false,
    },
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile
    },

    breadcrumbs() {
      return this.$store.state.breadcrumbs
    },

    pathEls() {
      return [
        {
          label: 'Home',
          url: this.localePath('index'),
        },
        ...this.breadcrumbs,
      ]
    },
  },
  methods: { capitalize, softTruncate },
}
</script>

<style scoped lang="scss">
@import '~/assets/variables.scss';

$bgcolor: $shade;

.breadcrumb {
  background: $bgcolor;
  // margin-bottom: $unit * 3;
  padding: 0;
  width: 50vw;
  white-space: nowrap;
  position: relative;
  border-bottom: 1px solid rgba($offwhite, 0.5);
  font-size: 0.9em;
  position: relative;
  z-index: 3;
  overflow: hidden;

  & > * {
    z-index: 1;
  }

  &:after {
    @include fade-to-color(right, $bgcolor);
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
    background: darken($bgcolor, 3%) !important;
    // height: 108%;
    // top: -4%;
    z-index: 4;
    box-shadow: 0px 2px 10px darken($shade, 20%) !important;
  }
}
</style>
