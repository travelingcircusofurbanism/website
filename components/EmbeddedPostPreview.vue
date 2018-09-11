<template>
  <a :href="url">
    <div
      class="post-preview"
      v-on="{mouseenter: mouseOver, mouseleave: mouseOut}"
    >

      <div
        v-lazy:background-image="image"
        class="previewimage"
      ></div>

      <div class="rightside">
        <h4>{{ title }}</h4>

        <PostDetails
          :category="category"
          :city="city"
        />

      </div>
    </div>
  </a>
</template>


<script>
import { capitalize, softTruncate } from '~/assets/commonFunctions.js'
import PostDetails from '~/components/PostDetails'

export default {
  props: [ 'url', 'image', 'title', 'category', 'city', 'date', 'mapPosition', ],
  components: { PostDetails, },
  computed: {
    isMobile () { return this.$store.state.isMobile },
  },
  data () {
    return {
      isDoubleHighlighting: false,
    }
  },
  beforeDestroy () {
    if (this.isDoubleHighlighting || this.isMobile) {
      this.$store.commit('setHighlight')
      this.$store.commit('setHighlight')
    }
  },
  methods: {
    capitalize,
    softTruncate,
    mouseOver () {
      if (this.isMobile) return
      this.$store.commit('setHighlight', this.mapPosition)
      this.isDoubleHighlighting = true
    },
    mouseOut () {
      if (this.isMobile) return
      this.$store.commit('setHighlight')
      this.isDoubleHighlighting = false
    }
  }
}

</script>

<style lang="scss" scoped>

a, a:hover, a:visited, a:active {
  text-decoration: none !important;
  color: $text;
  width: 100%;
  max-width: $unit * 80;
}

.post-preview {
  background: $shade;
  margin-top: $unit * 3;
  display: grid;
  grid-template-columns: $unit * 20 1fr;
  grid-gap: $unit * 3;
  min-height: $unit * 15;
  text-align: left;
  border: 1px solid $offwhite;
  transition: all .2s;

  &:hover {
    background: darken($shade, 3%);
  }

  .previewimage {
    background: $offwhite;
    height: 100%;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }

  @include width (large) {

  }

  @include width (midorsmaller) {
  }

  @include width (mobile) {
    min-height: auto;
    grid-gap: $unit * 3;
  }

  .rightside {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: $unit * 3;
    padding-left: 0;

    h4 {
      font-size: 1.0rem;
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
