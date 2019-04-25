<template>
  <section class="content" :class="{ ja: displayLanguage === 'ja' }">
    <div
      class="japanese-available content-top-full"
      v-if="(userLanguage === 'ja' || isDev) && content.ja && content.en"
    >
      <template v-if="displayLanguage !== 'ja'">
        <img src="~/assets/icons/japanFlag.svg" class="flag-icon">
        <span>日本語版もあります。</span>
        <span class="button invert" @click="setLanguage('ja')">切り替える</span>
      </template>
      <template v-else>
        <span>日本語版を表示しています。</span>
        <span class="button invert" @click="setLanguage('en')">英語に戻る</span>
      </template>
    </div>
    <Breadcrumb :title="titleInLanguage"/>

    <h1 :class="{ ja: displayLanguage === 'ja' }" @click="resetView">{{ titleInLanguage }}</h1>

    <PostDetails
      class="details"
      :category="category"
      :mapPosition="mapPosition"
      :city="city"
      :date="date"
    />

    <LoaderIcon v-if="loading" :active="loading" :absolute="false"/>

    <article
      v-lazy-container="{
        selector: 'img[data-src]',
        preLoad: 1.5, // screen heights away to start loading
      }"
      class="markdown"
      ref="postcontent"
      v-html="contentToDisplay"
    ></article>

    <RelatedArticles :city="city" :current="slug"/>

    <ContentFooter/>
  </section>
</template>

<script>
import axios from 'axios'
import ContentFooter from '~/components/Footer'
import PostDetails from '~/components/PostDetails'
import RelatedArticles from '~/components/RelatedArticles'
import Breadcrumb from '~/components/Breadcrumb'
import SearchSelector from '~/components/SearchSelector'
import LoaderIcon from '~/components/LoaderIcon'
const { capitalize } = require('~/assets/commonFunctions.js')

//TODO doesn't scroll to top on mobile

export default {
  props: [
    'title',
    'content',
    'category',
    'mapPosition',
    'city',
    'date',
    'loading',
    'slug',
    'description',
    'publicPath',
    'path',
    'image',
    'jaTitle',
    'prioritizeLanguage',
    'polygons',
    'public',
    'preview',
  ],

  components: {
    ContentFooter,
    RelatedArticles,
    PostDetails,
    Breadcrumb,
    SearchSelector,
    LoaderIcon,
  },

  data() {
    return {
      displayLanguage:
        this.prioritizeLanguage || this.$store.state.language || 'en',
    }
  },

  computed: {
    isDev() {
      return this.$store.state.isDev
    },
    isMobile() {
      return this.$store.state.isMobile
    },
    userLanguage() {
      return this.$store.state.language
    },
    onlyShowLanguage() {
      return this.$store.state.onlyShowLanguage
    },
    currentShowablePosts() {
      return this.$store.state.currentShowablePosts
    },
    allPosts() {
      return this.$store.state.allPosts
    },
    titleInLanguage() {
      return this.displayLanguage === 'ja' ? this.jaTitle : this.title
    },
    contentInRightLanguage() {
      return this.content[this.displayLanguage] || ''
    },
    contentToDisplay() {
      if (!this.contentInRightLanguage.length) return ''
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
      window.scrollTo(0, 0)
      this.$el.scrollTop = 0
    })

    if (this.content[this.displayLanguage])
      this.setLanguage(this.displayLanguage)

    // this is for live previews online
    this.$nextTick(() => {
      if (!this.public && !this.isDev && this.preview)
        this.$store.commit('setMapMarkers', this.allPosts)
    })
  },

  beforeDestroy() {
    if (!this.public && !this.isDev && this.preview)
      this.$store.commit('setMapMarkers', this.currentShowablePosts)
    this.$store.commit('setHighlight')
    this.$store.commit('setViewPolygons')
  },

  methods: {
    capitalize,

    doubleHighlight(location) {
      this.$store.commit('setHighlight', location)
    },

    unDoubleHighlight() {
      this.$store.commit('setHighlight')
    },

    setLanguage(language) {
      const prevLanguage = this.displayLanguage
      if (prevLanguage === language) return

      this.displayLanguage = language
      if (language === 'en') {
        this.$store.dispatch('setOnlyShowLanguage')
        this.$router.replace(this.publicPath.replace('/ja', ''))
      } else if (language === 'ja')
        this.$router.replace(
          this.publicPath
            .replace('/ja/', '/')
            .replace(
              /(\/?[^/]+\/)(.*)/g,
              (wholestring, firsthalf, secondhalf) =>
                firsthalf + 'ja/' + secondhalf
            )
        )
    },

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
        return this.contentInRightLanguage
      let newContent = this.contentInRightLanguage.replace(/&amp;/g, '&')
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
      this.$el.querySelectorAll('img').forEach(e => {
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

.japanese-available {
  background: $active;
  color: white;
  // margin-bottom: $unit * 5;
  text-align: center;

  @include width(mobile) {
    margin-bottom: $content-padding-mobile;
  }
}

.markdown {
  min-height: 50vh;
}

.details {
  @include width(mobile) {
    margin-top: 0;
  }
}
</style>
