<template>
  <section class="content">
    <LanguagePicker/>
    <SearchSelector/>
    <PostList :posts="showablePosts" title="Recent Posts"/>
    <ContentFooter/>
  </section>
</template>

<script>
import ContentFooter from '~/components/Footer'
import PostList from '~/components/PostList'
import SearchSelector from '~/components/SearchSelector'
import LanguagePicker from '~/components/LanguagePicker'
// const { get, set } = require('~/assets/storage').default

export default {
  head() {
    return {
      title: 'Home',
      meta: [
        { property: 'og:title', content: 'Traveling Circus of Urbanism' },
        {
          property: 'og:url',
          content: `https://www.travelingcircusofurbanism.com`,
        },
      ],
    }
  },
  components: {
    ContentFooter,
    PostList,
    SearchSelector,
    LanguagePicker,
  },
  asyncData({ store }) {
    let posts = store.state.allPosts
    return {
      posts,
    }
  },
  data() {
    return {
      // showIntro: false,
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile
    },
    isDev() {
      return this.$store.state.isDev
    },
    userLanguage() {
      return this.$store.state.language
    },
    onlyShowLanguage() {
      return this.$store.state.onlyShowLanguage
    },
    showablePosts() {
      return this.posts.filter(p =>
        this.$store.state.currentShowablePosts.includes(p)
      )
    },
  },
  created() {
    // if (!this.get('visited')) {
    //   this.showIntro = true
    //   // this.set('visited', true)
    // }
  },
  mounted() {
    this.$store.commit('setPan', true)
    this.$store.commit('setView', this.showablePosts)
    this.$store.commit('setHighlight')
  },
  methods: {
    // get,
    // set,
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/variables.scss';

.intro {
  margin: $content-padding * -1;
  padding: $content-padding * 1.5;
  background: $shade;
  line-height: 1.4;
  color: darken($offwhite, 60%);
  text-align: center;
  font-size: 1.2rem;

  @include width(mobile) {
    margin: $content-padding-mobile * -1;
    margin-bottom: $content-padding-mobile * 1;
    padding: $content-padding-mobile * 1.5;
  }
}
</style>
