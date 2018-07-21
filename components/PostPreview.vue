<template>
  <div
    class="post-preview"
    v-on="{mouseover: mouseOver, mouseout: mouseOut}"
  >

    <nuxt-link :to="url">
      <div
        :style="{'background-image': image ? `url('${ image }')` : ''}"
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
        <img src="~/assets/japanFlag.svg" class="flag-icon" />
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

      <div>
        {{ description }}
        <nuxt-link :to="url">Keep Reading →</nuxt-link>
      </div>

    </div>
  </div>
</template>


<script>
import { capitalize } from '~/assets/commonFunctions.js'
import PostDetails from '~/components/PostDetails'

export default {
  props: [ 'url', 'image', 'title', 'category', 'city', 'date', 'description', 'mapPosition', 'languages' ],
  components: { PostDetails, },
  computed: {
    isDev () { return this.$store.state.isDev },
    userLanguage () { return this.$store.state.language },
  },
  methods: {
    capitalize,
    mouseOver () {
      this.$store.commit('setHighlight', this.mapPosition)
    },
    mouseOut () {
      this.$store.commit('setHighlight')
    }
  }
}

</script>

<style lang="scss" scoped>

.post-preview {
  padding-bottom: $unit * 10;
  display: grid;
  grid-template-columns: 40% 1fr;
  grid-gap: $unit * 5;
  min-height: $unit * 45;

  .previewimage {
    background: $offwhite;
    height: 100%;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }

  @include width (midorsmaller) {
    grid-template-columns: 1fr;

    .previewimage {
      height: $unit * 50;
    }
  }

  @include width (mobile) {
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

</style>
