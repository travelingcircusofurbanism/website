<template>
  <div v-if="isMobile === false" class="breadcrumb content-top-full">
    <nuxt-link
      v-for="path, key in pathEls"
      :key="key"
      :to="path.url"
      exact
      class="crumb"
      :class="(key === pathEls.length - 1 ? 'last ' : '') + `gray${ key }`"
    >
      <span>{{ path.label }}</span>
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
    // currentCity () { return this.$store.state.currentCity },
    pathEls() {
      const path = this.$nuxt.$route.path.substring(1)
      const pathEls = [
        {
          label: 'Home',
          url: '/',
        },
      ]

      let preSlash = path.substring(0, path.indexOf('/'))
      let postSlash = path.substring(path.indexOf('/') + 1)
      let pagePrefix = ''
      if (preSlash === 'is' || preSlash === 'at') pagePrefix = preSlash
      else if (preSlash !== '')
        pathEls.push({
          label: this.capitalize(decodeURI(preSlash)),
          url: `/${preSlash}`,
        })
      pathEls.push({
        label: this.title
          ? this.softTruncate(this.title, 70)
          : `${pagePrefix ? pagePrefix + ': ' : ''}${this.capitalize(
              decodeURI(postSlash)
            )}`,
        url: `/${path}`,
      })
      return pathEls
    },
  },
  methods: { capitalize, softTruncate },
}
</script>

<style scoped lang="scss">
@import '~/assets/variables.scss';

.breadcrumb {
  background: $shade;
  margin-bottom: $unit * 3;
  padding: 0;
  width: 50vw;
  white-space: nowrap;
  position: relative;

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

  &::before {
    transition: all 0.2s;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: skew(-25deg);
    z-index: 3;
  }

  &.gray0:not(:last-of-type)::before {
    background: darken($shade, 8%);
  }
  &.gray1:not(:last-of-type)::before {
    background: darken($shade, 4%);
  }

  &:not(:last-of-type)::before {
    // box-shadow: 4px 0 4px darken($shade, 5%);
  }

  &:hover::before {
    background: $shade !important;
    height: 108%;
    top: -4%;
    z-index: 4;
    box-shadow: 0px 2px 10px darken($shade, 20%) !important;
  }
}
</style>
