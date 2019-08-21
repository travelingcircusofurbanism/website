<template>
  <div>
    <BlueBanner v-if="isDev && languages.ja && languages.en">
      Hi Dev! Showing the English version.
      <nuxt-link :to="switchLocalePath('ja')">Switch to Japanese</nuxt-link>
      <template #ja>
        Hi Dev! Showing the Japanese version.
        <nuxt-link :to="switchLocalePath('en')">Switch to English</nuxt-link>
      </template>
    </BlueBanner>

    <BlueBanner
      v-if="!isDev && displayLanguage !== $i18n.locale && clientLanguage === $i18n.locale"
    >
      <template #ja>
        この記事は英語版しかありません。
        <nuxt-link :to="localePath('index')" exact>ホームに戻る</nuxt-link>と日本語での記事があります！
      </template>
      This article is only in Japanese.
      <nuxt-link :to="localePath('index')" exact>Check out our home page instead!</nuxt-link>
    </BlueBanner>

    <section class="content">
      <h1 :class="{ ja: displayLanguage === 'ja' }" @click="resetView">{{ title[displayLanguage] }}</h1>

      <PostDetails
        class="details"
        :category="category"
        :mapPosition="mapPosition"
        :city="city"
        :date="date"
      />

      <Tags :tags="tags" />

      <!-- <LoaderIcon v-if="loading" :active="loading" :absolute="false" /> -->

      <article
        v-lazy-container="{
        selector: 'img[data-src]',
        preLoad: 2, // screen heights away to start loading
      }"
        class="markdown"
        :class="{ja: displayLanguage === 'ja' }"
        ref="postcontent"
        v-html="contentToDisplay"
      ></article>

      <RelatedArticles :city="city" :current="slug" />

      <ContentFooter />
    </section>
  </div>
</template>

<script>
import ContentFooter from '~/components/Footer'
import PostDetails from '~/components/PostDetails'
import RelatedArticles from '~/components/RelatedArticles'
// import LoaderIcon from '~/components/LoaderIcon'
import Tags from '~/components/Tags'
import BlueBanner from '~/components/BlueBanner'

export default {
  props: [
    'title',
    'content',
    'category',
    'mapPosition',
    'city',
    'date',
    'slug',
    'description',
    'publicPath',
    'image',
    'polygons',
    'public',
    'preview',
    'tags',
    'languages',
    'displayLanguage',
  ],

  components: {
    ContentFooter,
    RelatedArticles,
    PostDetails,
    // LoaderIcon,
    Tags,
    BlueBanner,
  },

  data() {
    return {}
  },

  computed: {
    isDev() {
      return this.$store.state.viewingAsDev
    },
    isMobile() {
      return this.$store.state.isMobile
    },
    userLanguage() {
      return this.$i18n.locale
    },
    currentShowablePosts() {
      return this.$store.state.currentShowablePosts
    },
    allPosts() {
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

    contentToDisplay() {
      if (!this.content || this.content.length === 0) return ''
      const contentToDisplay = this.highlightLocationText()
      this.$nextTick(this.addImageInteraction)
      this.$nextTick(this.addMapMoveOnHighlightTextHover)
      return contentToDisplay
    },
  },

  mounted() {
    this.resetView()
    this.$store.commit(
      'setHighlight',
      this.polygons
        ? Array.isArray(this.mapPosition)
          ? [...this.mapPosition, ...this.polygons]
          : [this.mapPosition, ...this.polygons]
        : this.mapPosition
    )

    this.$nextTick(() => {
      this.$el.scrollTop = 0
      this.$el.parentNode.scrollTop = 0
      document.querySelector('body').scrollTop = 0
      window.scrollTo(0, 0)
    })

    // this is for live previews online
    this.$nextTick(() => {
      if (!this.public[this.displayLanguage] && !this.isDev && this.preview)
        this.$store.commit('setMapMarkers', this.allPosts)
    })
  },

  beforeDestroy() {
    if (!this.public[this.displayLanguage] && !this.isDev && this.preview)
      this.$store.commit('setMapMarkers', this.currentShowablePosts)
    this.$store.commit('setHighlight')
    this.$store.commit('setViewPolygons')
  },

  methods: {
    doubleHighlight(location) {
      this.$store.commit('setHighlight', location)
    },

    unDoubleHighlight() {
      this.$store.commit('setHighlight')
    },

    // switchLanguage() {
    //   this.switchingPostLanguage = true
    //   const targetLanguage = this.displayLanguage === 'en' ? 'ja' : 'en'
    //   if (targetLanguage === 'en' && this.languages.en) {
    //     this.$store.dispatch('setOnlyShowLanguage')
    //     this.$router.replace(this.publicPath.replace('/ja', ''))
    //   } else if (targetLanguage === 'ja' && this.languages.ja)
    //     this.$router.replace(
    //       this.publicPath
    //         .replace('/ja/', '/')
    //         .replace(
    //           /(\/?[^/]+\/)(.*)/g,
    //           (wholestring, firsthalf, secondhalf) =>
    //             firsthalf + 'ja/' + secondhalf
    //         )
    //     )
    // },

    resetView() {
      this.$store.commit('setView', this.mapPosition)
      this.$store.commit('setViewPolygons', this.polygons)
      this.$store.commit('setCity', this.city)
      this.$store.commit('setPan', false)
    },

    highlightLocationText() {
      if (
        (!this.mapPosition && !this.polygons) ||
        (!Array.isArray(this.mapPosition) && !this.polygons) ||
        (this.mapPosition.length === 1 && !this.polygons) ||
        this.isMobile
      )
        return this.content
      let newContent = this.content.replace(/&amp;/g, '&')
      const toCheck = this.polygons
        ? [...this.mapPosition, ...this.polygons]
        : this.mapPosition
      toCheck
        .map(positionObject => positionObject.location)
        .forEach(location => {
          if (location.length < 4) return
          location = location.replace('’', "'")
          const locationRegex = new RegExp(`[\s\n >]${location}`, 'gi')
          newContent = newContent.replace(locationRegex, match => {
            return match.replace(
              new RegExp(`${location}`, 'gi'),
              `<span class="highlight">${location}</span>`
            )
          })
        })
      return newContent
    },

    addMapMoveOnHighlightTextHover() {
      if (
        (!this.mapPosition && !this.polygons) ||
        (!Array.isArray(this.mapPosition) && !this.polygons) ||
        (this.mapPosition.length === 1 && !this.polygons) ||
        this.isMobile ||
        !this.$refs ||
        !this.$refs.postcontent
      )
        return
      const toCheck = this.polygons
        ? [...this.mapPosition, ...this.polygons]
        : this.mapPosition
      this.$refs.postcontent.querySelectorAll('.highlight').forEach(e => {
        const elText = e.innerHTML.toLowerCase().replace('&amp;', '&')
        const foundLocation = toCheck.find(
          p => p.location && elText === p.location.toLowerCase()
        )
        if (foundLocation) {
          e.addEventListener('mouseover', () => {
            this.doubleHighlight(foundLocation.location)
            if (foundLocation.coordinates) {
              this.$store.commit('setView')
              this.$store.commit('setViewPolygons', [foundLocation])
            } else this.$store.commit('setView', foundLocation)
          })
          e.addEventListener('mouseout', this.unDoubleHighlight)
        }
      })
    },

    addImageInteraction() {
      if (!this.$el) return
      this.$refs.postcontent.querySelectorAll('img').forEach(e => {
        e.addEventListener('click', () =>
          this.$store.commit('setLightboxSrc', e.getAttribute('src'))
        )
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/variables.scss';

h1 {
  margin-bottom: $unit * 2;
}

.markdown {
  min-height: 30vh;
}

.details {
  @include width(mobile) {
    margin-top: 0;
  }
}
</style>
