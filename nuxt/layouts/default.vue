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

        <no-ssr>
          <BlueBanner v-if="!isDev && clientLanguage !== locale">
            <span class="ja">
              ここは英語版です！
              <nuxt-link :to="localePath('index','ja')" exact>日本版のホームに行く</nuxt-link>
            </span>
            <template #ja>
              <span class="en">
                You're on our Japanese site!
                <nuxt-link :to="localePath('index','en')" exact>Go to the English homepage</nuxt-link>
              </span>
            </template>
          </BlueBanner>
        </no-ssr>

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
import BlueBanner from '~/components/BlueBanner'

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
    BlueBanner,
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile
    },
    isDev() {
      return this.$store.state.viewingAsDev
    },
    locale() {
      return this.$i18n.locale
    },
    posts() {
      return this.$store.state.allPosts
    },
    clientLanguage() {
      return process.browser
        ? window
          ? (
              window.navigator.userLanguage || window.navigator.language
            ).substring(0, 2)
          : 'en'
        : this.$i18n.locale
    },
  },
  watch: {
    locale(newLocale) {
      this.$store.dispatch('updateShowablePosts')
    },
  },
  mounted() {
    const storedLanguage = this.getCookie('i18n_redirected')
    if (window) window.addEventListener('resize', this.checkWidth)
    this.checkWidth()
    this.checkForNoPosts()
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
      document.querySelector('.rightside').scrollTo(0, 0)
    },
    checkForNoPosts() {
      // had an issue with 404 not having any posts. this may not have fixed it.
      if (!this.posts || !this.posts.length) this.$store.dispatch('resetPosts')
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
