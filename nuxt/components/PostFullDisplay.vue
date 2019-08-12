<template>
  <section class="content">
    <div
      class="japanese-available content-top-full ja"
      v-if="isDev && languages.ja && languages.en"
    >
      <template v-if="displayLanguage !== 'ja'">
        <!-- <img src="~/assets/icons/japanFlag.svg" class="flag-icon" /> -->
        <span>Showing the English version.</span>
        <span class="button invert" @click="switchLanguage()">Switch</span>
      </template>
      <template v-else>
        <span>Showing the Japanese version.</span>
        <span class="button invert" @click="switchLanguage()">Switch</span>
      </template>
    </div>
    <Breadcrumb :title="title" />

    <h1 :class="{ ja: displayLanguage === 'ja' }" @click="resetView">{{ title }}</h1>

    <PostDetails
      class="details"
      :category="category"
      :mapPosition="mapPosition"
      :city="city"
      :date="date"
    />

    <Tags :tags="tags" />

    <LoaderIcon v-if="loading" :active="loading" :absolute="false" />

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
</template>

<script>
import ContentFooter from '~/components/Footer'
import PostDetails from '~/components/PostDetails'
import RelatedArticles from '~/components/RelatedArticles'
import Breadcrumb from '~/components/Breadcrumb'
import SearchSelector from '~/components/SearchSelector'
import LoaderIcon from '~/components/LoaderIcon'
import Tags from '~/components/Tags'
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
    'image',
    'displayLanguage',
    'polygons',
    'public',
    'preview',
    'tags',
    'languages',
  ],

  components: {
    ContentFooter,
    RelatedArticles,
    PostDetails,
    Breadcrumb,
    SearchSelector,
    LoaderIcon,
    Tags,
  },

  data() {
    return {
      switchingPostLanguage: false,
    }
  },

  computed: {
    isDev() {
      return this.$store.state.viewingAsDev
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
    contentToDisplay() {
      if (!this.content || this.content.length === 0) return ''
      const contentToDisplay = this.highlightLocationText()
      this.$nextTick(this.addImageInteraction)
      this.$nextTick(this.addMapMoveOnHighlightTextHover)
      return contentToDisplay
    },
  },

  created() {
    // if (
    //   this.onlyShowLanguage &&
    //   this.onlyShowLanguage !== this.displayLanguage &&
    //   this.languages[this.onlyShowLanguage]
    // ) {
    //   this.switchLanguage()
    // } else if (
    //   this.userLanguage !== this.displayLanguage &&
    //   this.languages[this.userLanguage] &&
    //   !this.isDev
    // ) {
    //   this.switchLanguage()
    // } else
    if (
      !this.content ||
      this.content.length === 0 ||
      (!this.isDev && !this.languages[this.displayLanguage])
    ) {
      this.switchLanguage()
    }
  },

  mounted() {
    if (this.switchingPostLanguage) return

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
    capitalize,

    doubleHighlight(location) {
      this.$store.commit('setHighlight', location)
    },

    unDoubleHighlight() {
      this.$store.commit('setHighlight')
    },

    switchLanguage() {
      this.switchingPostLanguage = true
      const targetLanguage = this.displayLanguage === 'en' ? 'ja' : 'en'
      if (targetLanguage === 'en' && this.languages.en) {
        this.$store.dispatch('setOnlyShowLanguage')
        this.$router.replace(this.publicPath.replace('/ja', ''))
      } else if (targetLanguage === 'ja' && this.languages.ja)
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
  min-height: 30vh;
}

.details {
  @include width(mobile) {
    margin-top: 0;
  }
}
</style>
