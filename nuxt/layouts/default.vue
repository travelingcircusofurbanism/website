<template>
  <div class="master" ref="master" :class="{ mobile: isMobile }">
    <Lightbox class="lightbox" />
    <MobileSearchSelectorOverlay class="mobilesearch" />
    <Header />
    <DevOverlay class="devoverlay" />
    <div class="maingrid">
      <Canvas />
      <nuxt />
    </div>
  </div>
</template>

<script>
import Canvas from '~/components/Canvas'
import Header from '~/components/Header'
import Lightbox from '~/components/Lightbox'
import MobileSearchSelectorOverlay from '~/components/MobileSearchSelectorOverlay'
import DevOverlay from '~/components/DevOverlay'

export default {
  head() {
    const i18nSeo = this.$nuxtI18nSeo()
    return {
      htmlAttrs: {
        ...i18nSeo.htmlAttrs,
      },
      meta: [
        {
          hid: `content-language`,
          'http-equiv': 'content-language',
          content: this.locale === 'en' ? 'en-US' : 'ja-JP',
        },
        ...i18nSeo.meta,
      ],
      link: [...i18nSeo.link],
    }
  },
  components: {
    Canvas,
    Header,
    Lightbox,
    MobileSearchSelectorOverlay,
    DevOverlay,
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile
    },
    locale() {
      return this.$i18n.locale
    },
  },
  watch: {
    locale() {
      this.$store.dispatch('updateShowablePosts')
    },
  },
  mounted() {
    if (window) window.addEventListener('resize', this.checkWidth)
    this.checkWidth()
    this.$root._router.afterEach(this.resetScroll)
  },
  methods: {
    checkWidth() {
      this.$store.commit('setMobile', window ? window.innerWidth : 1000)
    },
    resetScroll() {
      document.querySelector('body').scrollTo(0, 0)
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';

.master {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  position: relative;

  @include width(mobile) {
    display: block;
    height: auto;

    & > *:not(.lightbox):not(.devoverlay):not(.mobilesearch) {
      max-width: 100%;
      overflow-y: visible;
      height: auto;
    }
  }

  .maingrid {
    @include width(desktop) {
      width: 100%;
      display: grid;
      grid-template-columns: 50% 50%;

      & > * {
        position: relative;
        overflow: hidden;
        overflow-y: auto;
        height: 100vh;
      }
    }
  }
}
</style>
