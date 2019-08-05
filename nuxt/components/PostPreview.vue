<template>
  <div
    class="post-preview"
    v-on="{ mouseenter: mouseOver, mouseleave: mouseOut }"
    :class="{
          fade:shouldFade}"
  >
    <nuxt-link :to="languageUrl">
      <div
        v-lazy:background-image="{
          src: image,
          loading: loader,
        }"
        :key="image"
        class="previewimage"
      ></div>
    </nuxt-link>

    <div>
      <nuxt-link :to="languageUrl" class="titlelink">
        <h4
          :class="{ja: userLanguage === 'ja' && languages.ja && showableLanguages.ja}"
        >{{ languageTitle }}</h4>
      </nuxt-link>

      <!-- <div class="japanese-available" v-if="(userLanguage === 'ja' || isDev) && languages.ja">
        <img src="~/assets/icons/japanFlag.svg" class="flag-icon" />
        <span class="sub ja">
          {{
          languages.en ? '日本語版あり' : '日本語での記事'
          }}
        </span>
      </div>-->

      <PostDetails :category="category" :mapPosition="mapPosition" :city="city" :date="date" />

      <div
        class="description"
        :class="{ja: languages.ja && userLanguage === 'ja' && showableLanguages.ja }"
      >
        {{ languageDescription }}
        <nuxt-link
          :to="languageUrl"
        >{{userLanguage === 'ja' && languages.ja && showableLanguages.ja ? `読み続ける →` : `Keep Reading →`}}</nuxt-link>
        <h4 class="microseo" v-if="seoTitle && seoUrl">
          <nuxt-link :to="seoUrl">{{ seoTitle }}</nuxt-link>
        </h4>
        <div class="microseo" v-if="seoTitle && seoUrl">
          {{ seoDescription ? seoDescription : '' }}
          <a
            :href="seoUrl"
          >{{userLanguage === 'en' && languages.ja && showableLanguages.ja ? `読み続ける →` : `Keep Reading →`}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { capitalize, MDYToDate } = require('~/assets/commonFunctions.js')
import PostDetails from '~/components/PostDetails'

export default {
  props: [
    'url',
    'image',
    'title',
    'jaTitle',
    'category',
    'city',
    'date',
    'description',
    'jaDescription',
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
      return this.$store.state.language
    },
    languageUrl() {
      return this.userLanguage === 'ja' &&
        this.languages.ja &&
        (this.showableLanguages.ja || this.isDev)
        ? this.url.replace(
            /(\/?[^/]+\/)(.*)/g,
            (wholestring, firsthalf, secondhalf) =>
              firsthalf + 'ja/' + secondhalf
          )
        : this.url
    },
    seoUrl() {
      if (this.userLanguage === 'en' && this.showableLanguages.ja)
        return this.url.replace(
          /(\/?[^/]+\/)(.*)/g,
          (wholestring, firsthalf, secondhalf) => firsthalf + 'ja/' + secondhalf
        )
      else if (this.userLanguage === 'ja' && this.showableLanguages.en)
        return this.url
    },
    languageTitle() {
      return this.userLanguage === 'ja' &&
        this.jaTitle &&
        (this.showableLanguages.ja || this.isDev)
        ? this.jaTitle
        : capitalize(this.title)
    },
    seoTitle() {
      if (
        this.userLanguage === 'ja' &&
        this.title &&
        this.showableLanguages.ja &&
        this.showableLanguages.en
      )
        return this.title
      else if (
        this.userLanguage === 'en' &&
        this.jaTitle &&
        this.showableLanguages.ja &&
        this.showableLanguages.en
      )
        return this.jaTitle
    },
    languageDescription() {
      return this.userLanguage === 'ja' &&
        (this.showableLanguages.ja || this.isDev) &&
        this.jaDescription
        ? this.jaDescription
        : this.description
    },
    seoDescription() {
      if (
        this.userLanguage === 'ja' &&
        this.description &&
        this.showableLanguages.en
      )
        return this.description
      else if (
        this.userLanguage === 'en' &&
        this.jaDescription &&
        this.showableLanguages.ja
      )
        return this.jaDescription
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
                !this.mapPosition.find(p => p.location)))))
      )
    },
    showableLanguages() {
      return {
        en:
          this.languages.en &&
          this.$store.state.onlyShowLanguage !== 'ja' &&
          (this.public === true ||
            (typeof this.public === 'object' && this.public.en === true)),
        ja:
          this.languages.ja &&
          (this.public === true ||
            (typeof this.public === 'object' && this.public.ja === true)),
      }
    },
    shouldFade() {
      return (
        (this.isDev &&
          (this.showableLanguages[this.userLanguage] !== true &&
            this.userLanguage)) ||
        MDYToDate(this.date).getTime() > new Date().getTime()
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
      if (this.isMobile || this.noPositionToHighlight) return
      this.$store.commit(
        'setHighlight',
        this.polygons
          ? Array.isArray(this.mapPosition)
            ? [...this.mapPosition, ...this.polygons]
            : [this.mapPosition, ...this.polygons]
          : this.mapPosition
      )
      this.isDoubleHighlighting = true
    },
    mouseOut() {
      if (this.isMobile || this.noPositionToHighlight) return
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
  margin-bottom: $unit * 10;
  display: grid;
  grid-template-columns: 40% 1fr;
  grid-gap: $unit * 4;
  min-height: $unit * 45;

  .previewimage {
    background: $shade;
    height: 100%;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }

  @include width(large) {
    grid-template-columns: 45% 1fr;
  }

  @include width(midorsmaller) {
    grid-template-columns: 100%;

    .previewimage {
      height: $unit * 50;
    }
  }

  @include width(mobile) {
    min-height: auto;
    grid-gap: $unit * 3;

    .previewimage {
      height: $unit * 30;
    }
  }

  .titlelink {
    text-decoration: none;
  }
}

.japanese-available {
  line-height: 1;
}

h4 {
  color: $text !important;
  margin-top: 0;
  margin-bottom: $unit * 2;
  line-height: 1.3;
}

.description {
  word-break: break-word;

  &.ja {
    line-height: 1.6;
    text-align: justify;
  }
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
