<template>
  <div
    class="post-preview"
    v-on="{ mouseenter: mouseOver, mouseleave: mouseOut }"
  >
    <nuxt-link :to="url">
      <div
        v-lazy:background-image="{
          src: image,
          loading: loader,
        }"
        class="previewimage"
      ></div>
    </nuxt-link>

    <div>
      <nuxt-link :to="url" class="titlelink">
        <h4>{{ title }}</h4>
      </nuxt-link>

      <div
        class="japanese-available"
        v-if="(userLanguage === 'ja' || isDev) && languages.ja"
      >
        <img src="~/assets/icons/japanFlag.svg" class="flag-icon" />
        <span class="sub">{{
          languages.en ? '日本語版あり' : '日本語での記事'
        }}</span>
      </div>

      <PostDetails
        :category="category"
        :mapPosition="mapPosition"
        :city="city"
        :date="date"
      />

      <div class="description">
        {{ description }}
        <nuxt-link :to="url">Keep Reading →</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
const { capitalize } = require('~/assets/commonFunctions.js')
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
  ],
  components: { PostDetails },
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
    loader() {
      return this.image.includes('/med/')
        ? this.image.replace('/med/', '/tiny/')
        : undefined
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
      if (this.isMobile) return
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
      if (this.isMobile) return
      this.$store.commit('setHighlight')
      this.isDoubleHighlighting = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/variables.scss';

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
}

.description {
  word-break: break-word;
}
</style>
