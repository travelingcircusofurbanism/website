<template>
  <section class="content">
    <LanguagePicker />
    <SearchSelector />
    <div class="intro" v-if="showIntro">
      <strong>
        This is a blog by
        <nuxt-link to="/about" exact class="subtle">Mariko Sugita</nuxt-link>,
      </strong> city enthusiast and nomadic urban researcher. It's about urban culture, design, planning, history, spaces, and more –
      <strong>all about cities!</strong>
    </div>

    <PostList :posts="showablePosts" title="Recent Posts" />
    <ContentFooter />
  </section>
</template>

<script>
import ContentFooter from '~/components/Footer'
import PostList from '~/components/PostList'
import SearchSelector from '~/components/SearchSelector'
import LanguagePicker from '~/components/LanguagePicker'
const { get, set } = require('~/assets/storage').default

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
      showIntro: false,
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile
    },
    isDev() {
      return this.$store.state.viewingAsDev
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
  mounted() {
    // if (this.isDev || !this.get('visited')) {
    //   this.showIntro = true
    //   this.set('visited', true)
    // }
    this.$store.commit('setPan', true)
    this.$store.commit('setView', this.showablePosts)
    this.$store.commit('setHighlight')
  },
  methods: {
    get,
    set,
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/variables.scss';

.intro {
  margin: $content-padding * -1;
  padding: $content-padding * 1.7 $content-padding * 1.5 $content-padding * 1
    $content-padding * 1.5;
  line-height: 1.4;
  color: darken($offwhite, 60%);
  text-align: center;
  font-size: 1.15rem;

  @include width(mobile) {
    margin: $content-padding-mobile * -1;
    margin-bottom: $content-padding-mobile * 1;
    padding: $content-padding-mobile * 1.5;
  }
}
</style>
