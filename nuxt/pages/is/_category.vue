<template>
  <section class="content">
    <LanguagePicker
      v-if="showablePosts.find(post => post.languages[userLanguage === 'en' ? 'ja' : 'en'])"
    />
    <Breadcrumb/>
    <SearchSelector/>
    <PostList :posts="showablePosts" :title="category"/>
    <ContentFooter/>
  </section>
</template>

<script>
import ContentFooter from '~/components/Footer'
import PostList from '~/components/PostList'
import Breadcrumb from '~/components/Breadcrumb'
import SearchSelector from '~/components/SearchSelector'
import LanguagePicker from '~/components/LanguagePicker'
const { capitalize } = require('~/assets/commonFunctions.js')

//TODO double highlights some stuff when navigating around between /is/ pages

export default {
  components: {
    ContentFooter,
    PostList,
    Breadcrumb,
    SearchSelector,
    LanguagePicker,
  },
  scrollToTop: true,
  head() {
    return {
      title: this.capitalize(this.category),
      meta: [
        {
          property: 'og:title',
          content: `${this.capitalize(
            this.category
          )} | Traveling Circus of Urbanism`,
        },
        {
          property: 'og:url',
          content: `https://www.travelingcircusofurbanism.com/is/${
            this.category
          }`,
        },
        {
          hid: `og:image`,
          property: 'og:image',
          content:
            this.posts[0].image.substring(0, 4) === 'http'
              ? this.posts[0].image
              : `https://www.travelingcircusofurbanism.com${
                  this.posts[0].image
                }`,
        },
      ],
    }
  },
  asyncData({ route, redirect, error, isStatic, store }) {
    const category = decodeURI(route.path)
      .replace('/is/', '')
      .toLowerCase()
    let posts = store.state.allPosts
    if (!posts || posts.length === 0)
      return error({ statusCode: 404, message: 'Page not found.' })
    posts = posts.filter(p => {
      return p.category && p.category.toLowerCase() === category
    })
    if (posts.length === 1) return redirect(posts[0].url)
    return {
      posts,
      category,
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
  mounted() {
    this.$store.commit('setPan', false)
    this.$store.commit('setView', this.showablePosts)
    this.$store.commit(
      'setHighlight',
      [].concat.apply(
        [],
        this.showablePosts.map(p => p.mapPosition).filter(p => p)
      )
    )
  },
  methods: {
    capitalize,
  },
}
</script>

<style scoped lang="scss"></style>
