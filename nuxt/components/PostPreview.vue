<template>
  <div
    class="post-preview"
    v-on="{ mouseenter: mouseOver, mouseleave: mouseOut }"
    :class="{
      fade: shouldFade,
    }"
  >
    <nuxt-link
      :to="
        localePath({
          name: 'city-post',
          params: { city, post: slug },
        })
      "
      class="imglink"
    >
      <div
        v-lazy:background-image="{
          src: image,
          loading: loader,
        }"
        :key="image"
        class="previewimage"
      ></div>
    </nuxt-link>

    <div class="textsection">
      <nuxt-link
        :to="
          localePath({
            name: 'city-post',
            params: { city, post: slug.toLowerCase() },
          })
        "
        class="titlelink"
      >
        <h4
          :class="{
            ja:
              userLanguage === 'ja' &&
              languages.ja &&
              public.ja,
          }"
        >
          {{ languageTitle }}
        </h4>
      </nuxt-link>

      <PostDetails
        :category="category"
        :mapPosition="mapPosition"
        :city="city"
        :date="date"
        :twoLine="true"
      />
      <!-- 
      <div class="description" :class="{ja: languages.ja && userLanguage === 'ja' && public.ja }">
        {{ languageDescription }}
        <nuxt-link
          :to="localePath({name: 'city-post', params: {city, post: slug}})"
          class="keepreading"
        >{{userLanguage === 'ja' && languages.ja && public.ja ? `読み続ける →` : `Keep Reading →`}}</nuxt-link>
        <h4 class="microseo" v-if="seoTitle && seoUrl">
          <nuxt-link :to="seoUrl">{{ seoTitle }}</nuxt-link>
        </h4>
        <div class="microseo" v-if="seoTitle && seoUrl">
          {{ seoDescription ? seoDescription : '' }}
          <a
            :href="seoUrl"
          >{{userLanguage === 'en' && languages.ja && public.ja ? `読み続ける →` : `Keep Reading →`}}</a>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
const {
  capitalize,
  MDYToDate,
} = require('~/assets/commonFunctions.js')
import PostDetails from '~/components/PostDetails'

export default {
  props: [
    'url',
    'image',
    'title',
    'category',
    'city',
    'date',
    'description',
    'mapPosition',
    'languages',
    'polygons',
    'public',
    'slug',
  ],
  components: { PostDetails },
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
    seoUrl() {
      if (this.userLanguage === 'en' && this.public.ja)
        return `/ja` + this.url
      else if (this.userLanguage === 'ja' && this.public.en)
        return this.url
    },
    languageTitle() {
      return this.userLanguage === 'ja' &&
        this.title.ja &&
        (this.public.ja || this.isDev)
        ? this.title.ja || capitalize(this.title.en)
        : capitalize(this.title.en) || this.title.ja
    },
    seoTitle() {
      if (
        this.userLanguage === 'ja' &&
        this.title.en &&
        this.public.ja &&
        this.public.en
      )
        return this.title.en
      else if (
        this.userLanguage === 'en' &&
        this.title.ja &&
        this.public.ja &&
        this.public.en
      )
        return this.title.ja
    },
    languageDescription() {
      return this.userLanguage === 'ja' &&
        (this.public.ja || this.isDev) &&
        this.description.ja
        ? this.description.ja || this.description.en
        : this.description.en || this.description.ja
    },
    seoDescription() {
      if (
        this.userLanguage === 'ja' &&
        this.description.en &&
        this.public.en
      )
        return this.description.en
      else if (
        this.userLanguage === 'en' &&
        this.description.ja &&
        this.public.ja
      )
        return this.description.ja
    },
    loader() {
      return this.image.includes('/med/')
        ? this.image.replace('/med/', '/tiny/')
        : undefined
    },
    noPositionToHighlight() {
      return (
        this.isMobile ||
        ((!this.polygons || this.polygons.length === 0) &&
          (!this.mapPosition ||
            (Array.isArray(this.mapPosition) &&
              (this.mapPosition.length === 0 ||
                !this.mapPosition.find(
                  (p) => p.location,
                )))))
      )
    },

    shouldFade() {
      return (
        (this.isDev &&
          this.public[this.userLanguage] !== true &&
          this.userLanguage) ||
        MDYToDate(this.date).getTime() >
          new Date().getTime()
      )
    },
  },
  data() {
    return {
      isDoubleHighlighting: false,
    }
  },
  beforeDestroy() {
    if (this.isDoubleHighlighting || this.isMobile) {
      this.$store.commit('setHighlight')
      this.$store.commit('setHighlight')
    }
  },
  methods: {
    capitalize,
    mouseOver() {
      if (this.isMobile || this.noPositionToHighlight)
        return
      this.$store.commit(
        'setHighlight',
        this.polygons
          ? Array.isArray(this.mapPosition)
            ? [...this.mapPosition, ...this.polygons]
            : [this.mapPosition, ...this.polygons]
          : this.mapPosition,
      )
      this.isDoubleHighlighting = true
    },
    mouseOut() {
      if (this.isMobile || this.noPositionToHighlight)
        return
      this.$store.commit('setHighlight')
      this.isDoubleHighlighting = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/variables.scss';

.fade {
  opacity: 0.4;
}

.post-preview {
  // margin-bottom: $unit * 10;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;

  @include width(mobile) {
    display: block;
  }
  // grid-template-columns: 1fr;
  // grid-gap: $unit * 2;
  // min-height: $unit * 40;

  .previewimage {
    background: $shade;
    height: $unit * 5;
    min-height: $unit * 35;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    overflow: hidden;
  }

  @include width(large) {
    grid-template-columns: 1fr;
  }

  @include width(midorsmaller) {
    grid-template-columns: 1fr;

    .previewimage {
      height: auto;
      // height: $unit * 50;
    }
  }

  @include width(mobile) {
    min-height: auto;
    grid-gap: $unit * 3;

    .previewimage {
      height: auto;
      // height: $unit * 30;
    }
  }

  .titlelink {
    margin-top: $unit * 2;
    display: inline-block;
    text-decoration: none;
  }
}

.japanese-available {
  line-height: 1;
}

h4 {
  color: $text !important;
  margin-top: 0;
  margin-bottom: $unit * 1;
  line-height: 1.3;
}

.description {
  word-break: break-word;

  &.ja {
    line-height: 1.6;
    text-align: justify;
  }
}

.keepreading {
  white-space: nowrap;
}

.microseo {
  color: white !important;
  width: 1px;
  padding: 0;
  margin: 0;
  height: 1px;
  display: inline-block;
  overflow: hidden;
  user-select: none;
}
</style>
