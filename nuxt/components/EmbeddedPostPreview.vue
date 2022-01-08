<template>
  <a :href="url">
    <div
      class="post-preview"
      v-on="{ mouseenter: mouseOver, mouseleave: mouseOut }"
    >
      <div
        v-lazy:background-image="image"
        class="previewimage"
      ></div>

      <div class="pp-rightside">
        <h4>{{ title }}</h4>

        <PostDetails :category="category" :city="city" />
      </div>
    </div>
  </a>
</template>

<script>
const {
  capitalize,
  softTruncate,
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
    'mapPosition',
  ],
  components: { PostDetails },
  computed: {
    isMobile() {
      return this.$store.state.isMobile
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
    softTruncate,
    mouseOver() {
      if (this.isMobile) return
      this.$store.commit('setHighlight', this.mapPosition)
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

a,
a:hover,
a:visited,
a:active {
  text-decoration: none !important;
  display: block;
  color: $text;
  width: 100%;
  max-width: $unit * 80;
}

.post-preview {
  background: white;
  margin-top: $unit * 3;
  display: grid;
  grid-template-columns: $unit * 20 1fr;
  gap: $unit * 3;
  min-height: $unit * 15;
  text-align: left;
  border: 1px solid $shade;
  transition: all 0.4s;
  box-shadow: 0 calc($unit / 2) calc($unit / 2)
      darken($shade, 7%),
    0 $unit * 2 $unit * 2 darken($shade, 2%);

  &:hover {
    box-shadow: 0 $unit $unit darken($shade, 11%);
    background: $shade;
  }

  .previewimage {
    background: $offwhite;
    height: 100%;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }

  @include width(large) {
  }

  @include width(midorsmaller) {
  }

  @include width(mobile) {
    min-height: auto;
    gap: $unit * 3;
  }

  .pp-rightside {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: $unit * 3;
    padding-left: 0;

    h4 {
      font-size: 1rem;
      margin: 0;
    }

    p {
      margin: 0;
    }
  }
}

h4 {
  color: $text !important;
  margin-top: 0;
  margin-bottom: $unit * 2;
}
</style>
