<template>
  <div class="relatedposts" v-if="postsToDisplay.length > 0">
    <SectionHeader>
      More posts from
      <nuxt-link
        :to="localePath({
            name: 'city',
            params: { city },
          })"
        class="citylink"
      >
        {{
        capitalize(city)
        }}
      </nuxt-link>
    </SectionHeader>
    <div class="postgrid">
      <nuxt-link
        v-for="(post, key) in postsToDisplay"
        :key="key"
        :to="localePath({
            name: 'city-post',
            params: { city, post: post.slug },
          })"
        class="relatedpost"
      >
        <div class="relatedimage" v-lazy:background-image="post.image"></div>
        <div>{{ userLanguage === 'ja' && post.title.ja && post.public.ja === true ? post.title.ja || post.title.en : post.title.en || post.title.ja }}</div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import SectionHeader from '~/components/SectionHeader'
import { capitalize } from '~/assets/commonFunctions.js'

export default {
  props: ['city', 'current'],
  components: { SectionHeader },
  data() {
    return {
      allCityPosts: [],
    }
  },
  computed: {
    userLanguage() {
      return this.$i18n.locale
    },
    posts() {
      return this.$store.state.currentShowablePosts
    },
    postsToDisplay() {
      const postsToDisplay = []
      for (let p of this.allCityPosts) {
        if (
          this.current !== p.slug &&
          (p.languages[this.userLanguage] || p.languages.en)
        )
          postsToDisplay.push(p)
        if (postsToDisplay.length === this.relatedPostCount)
          return postsToDisplay
      }
      return postsToDisplay
    },
    relatedPostCount() {
      return this.$store.state.isMobile ? 2 : 3
    },
  },
  mounted() {
    if (!this.city) return
    this.allCityPosts = this.posts.filter(
      p =>
        p.city === this.city.toLowerCase() &&
        p.public[this.userLanguage] === true
    )
  },
  methods: {
    capitalize,
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/variables.scss';

.relatedposts {
  margin-bottom: $unit * 10;
}

// h4 {
//   // display: inline-block;
//   // text-align: center;
// }
.citylink {
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}

.postgrid {
  display: flex;

  @include width(mobile) {
    display: grid;
  }
}

.relatedpost {
  flex: 1;
  display: block;
  height: 100%;
  text-decoration: none;
  color: $text;

  &:hover {
    color: $active;
  }

  &:not(:last-of-type) {
    margin-right: $unit * 4;
  }

  @include width(mobile) {
    margin-bottom: $unit * 5;
    text-align: center;
    text-decoration: underline;

    &:not(:last-of-type) {
      margin-right: 0;
    }
  }

  &:hover {
    text-decoration: underline;
  }

  .relatedimage {
    background-size: cover;
    height: $unit * 30;
    margin-bottom: $unit * 2;
  }
}
</style>
