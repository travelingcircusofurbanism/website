<template>
  <section class="content" :key="Date.now()">
    <LanguagePicker
      v-if="showablePosts.find(post => post.languages[userLanguage === 'en' ? 'ja' : 'en'])"
    />
    <Breadcrumb />
    <SearchSelector />
    <PostList :posts="showablePosts" :title="postListTitle" />
    <ContentFooter />
  </section>
</template>

<script>
import ContentFooter from '~/components/Footer'
import PostList from '~/components/PostList'
import Breadcrumb from '~/components/Breadcrumb'
import SearchSelector from '~/components/SearchSelector'
import LanguagePicker from '~/components/LanguagePicker'
const { capitalize } = require('~/assets/commonFunctions.js')

export default {
  components: {
    ContentFooter,
    PostList,
    Breadcrumb,
    SearchSelector,
    LanguagePicker,
  },
  props: {
    postListTitle: {
      required: true,
    },
    posts: {
      required: true,
    },
    marker: {
      required: false,
    },
  },
  scrollToTop: true,
  data() {
    return {
      skippingToFirstPost: false,
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
  beforeDestroy() {
    this.$store.commit('setHighlight')
  },
  created() {
    if (this.showablePosts.length === 1) {
      this.$store.commit('setHighlight')
      this.$store.commit('setViewPolygons')
      this.skippingToFirstPost = true
      return this.$router.replace({
        path: this.showablePosts[0].url,
      })
    }
  },
  mounted() {
    if (this.skippingToFirstPost) return
    this.$store.commit('setPan', false)
    if (this.marker) {
      this.$store.commit('setView', this.marker)
      this.$store.commit('setHighlight', this.marker)
    } else {
      this.$store.commit('setView', this.showablePosts)
      const polygons = this.showablePosts
        .map(p => p.polygons)
        .filter(p => p)
        .reduce((flatArray, p) => flatArray.concat(p), [])
      if (polygons.length > 0) this.$store.commit('setViewPolygons', polygons)
      this.$store.commit('setHighlight', this.showablePosts)
    }
  },
  methods: {
    capitalize,
  },
}
</script>

<style scoped lang="scss"></style>
