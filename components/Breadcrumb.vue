<template>
  <div v-if="!isMobile" class="content-top-full">
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
import { capitalize, softTruncate } from '~/assets/commonFunctions.js'

export default {
  props: {
    title: {
      required: false
    }
  },
  computed: {
    isMobile () { return this.$store.state.isMobile },
    currentCity () { return this.$store.state.currentCity },
    pathEls () {
      const path = this.$nuxt.$route.path.substring(1)
      const pathEls = [{
        label: 'Home',
        url: '/'
      }]
      let preSlash = path.substring(0, path.indexOf('/'))
      let postSlash = path.substring(path.indexOf('/') + 1)
      let pagePrefix = ''
      if (preSlash === 'is' || preSlash === 'at')
        pagePrefix = preSlash
      else if (preSlash !== '')
        pathEls.push({
          label: this.capitalize(this.currentCity),
          url: `/${ this.currentCity }`
        })
      pathEls.push({
        label: this.title ? 
          this.softTruncate(this.capitalize(this.title), 70) :
          `${ pagePrefix ? pagePrefix + ': ' : '' }${ this.capitalize(postSlash) }`,
        url: `/${ path }`
      })
      return pathEls
    }
  },
  methods: { capitalize, softTruncate },
}

</script>

<style scoped lang="scss">

.content-top-full {
  background: $shade;
  margin-bottom: $unit * 5;
  padding: 0;
  width: 250%;
}

.crumb {
  transition: all .2s;
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
  }

  &::before {
    transition: all .2s;
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
    background: white !important;
    box-shadow: 0px 0 8px darken($shade, 5%) !important;
  }
}
</style>
