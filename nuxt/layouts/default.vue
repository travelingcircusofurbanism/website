<template>
  <div class="master" ref="master" :class="{ mobile: isMobile }">
    <Lightbox class="lightbox" />
    <MobileSearchSelectorOverlay class="mobilesearch" />
    <Header />
    <DevOverlay class="devoverlay" />
    <div class="maingrid">
      <Canvas />
      <div class="rightside">
        <TopBar v-if="!isMobile" />
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import Canvas from '~/components/Canvas'
import Header from '~/components/Header'
import Lightbox from '~/components/Lightbox'
import MobileSearchSelectorOverlay from '~/components/MobileSearchSelectorOverlay'
import TopBar from '~/components/TopBar'
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
    TopBar,
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
    locale(newLocale) {
      // console.log('Switching locale to', newLocale)
      this.$store.dispatch('updateShowablePosts')
    },
  },
  mounted() {
    let clientLanguage = window
      ? window.navigator.userLanguage || window.navigator.language
      : 'en'
    if (clientLanguage.indexOf('en') > -1) clientLanguage = 'en'
    if (clientLanguage.indexOf('ja') > -1) clientLanguage = 'ja'
    const storedLanguage = this.getCookie('i18n_redirected')
    // console.log(clientLanguage, storedLanguage, this.$i18n.locale)
    if (storedLanguage && this.$i18n.locale !== storedLanguage)
      return this.$router.replace(this.switchLocalePath(storedLanguage))
    else if (!storedLanguage && clientLanguage !== this.$i18n.locale)
      return this.$router.replace(this.switchLocalePath(clientLanguage))

    if (window) window.addEventListener('resize', this.checkWidth)
    this.checkWidth()
    this.$root._router.afterEach((to, from) => {
      this.resetScroll()
    })
  },
  methods: {
    checkWidth() {
      this.$store.commit('setMobile', window ? window.innerWidth : 1000)
    },
    resetScroll() {
      document.querySelector('body').scrollTo(0, 0)
    },
    getCookie(key) {
      if (!document) return
      const name = key + '='
      const decodedCookie = decodeURIComponent(document.cookie)
      const ca = decodedCookie.split(';')
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == ' ') c = c.substring(1)
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
      }
      return ''
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
