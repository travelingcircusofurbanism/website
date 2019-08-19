<template>
  <section class="content" :key="Date.now()">
    <BlueBanner v-if="showablePosts.length === 0 && clientLanguage === $i18n.locale">
      There are no English posts here yet!
      <nuxt-link :to="localePath('index')" exact>Check out our home page</nuxt-link>
      <span>to find articles in English.</span>
      <template #ja>
        ここの日本語の記事はまだありません。
        <nuxt-link :to="localePath('index')" exact>ホームに戻る</nuxt-link>と日本語での記事があります！
      </template>
    </BlueBanner>
    <PostList :posts="showablePosts" :title="postListTitle" />
    <ContentFooter />
  </section>
</template>

<script>
import ContentFooter from '~/components/Footer'
import PostList from '~/components/PostList'
import BlueBanner from '~/components/BlueBanner'

export default {
  components: {
    ContentFooter,
    PostList,
    BlueBanner,
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
      clientLanguage: this.$i18n.locale,
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
      return this.$i18n.locale
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
      const firstPost = this.showablePosts[0]

      return this.$router.replace({
        path: this.localePath({
          name: 'city-post',
          params: { city: firstPost.city, post: firstPost.slug },
        }),
      })
    }
  },
  mounted() {
    if (this.skippingToFirstPost) return
    this.clientLanguage = (window
      ? window.navigator.userLanguage || window.navigator.language
      : 'en'
    ).substring(0, 2)
    this.$el.parentElement.scrollTop = 0
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
  methods: {},
}
</script>

<style scoped lang="scss"></style>
