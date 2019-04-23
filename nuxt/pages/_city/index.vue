<template>
  <section class="content">
    <Breadcrumb/>
    <LanguagePicker
      v-if="showablePosts.find(post => post.languages[userLanguage === 'en' ? 'ja' : 'en'])"
    />
    <PostList :posts="showablePosts" :title="city"/>
    <ContentFooter/>
  </section>
</template>

<script>
import ContentFooter from '~/components/Footer'
import PostList from '~/components/PostList'
import Breadcrumb from '~/components/Breadcrumb'
import LanguagePicker from '~/components/LanguagePicker'
const { capitalize } = require('~/assets/commonFunctions.js')

export default {
  head() {
    const description = `Urbanist case studies, interviews, and stories from ${this.capitalize(
      this.city
    )} on the Traveling Circus of Urbanism.`
    return {
      title: this.capitalize(this.city),
      meta: [
        {
          property: 'og:title',
          content: `${this.capitalize(
            this.city
          )} | Traveling Circus of Urbanism`,
        },
        { hid: 'description', name: 'description', content: description },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          property: 'og:url',
          content: `https://www.travelingcircusofurbanism.com/${this.city}`,
        },
        {
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
  components: { ContentFooter, PostList, Breadcrumb, LanguagePicker },
  asyncData({ route, redirect, error, isStatic, store }) {
    const city = decodeURI(route.path)
      .replace(/\//g, '')
      .replace(/\/$/, '')
      .toLowerCase()
    let posts = store.state.allPosts.filter(p => p.city.toLowerCase() === city)
    if (!posts || posts.length === 0)
      return error({ statusCode: 404, message: 'Page not found.' })
    // if (posts.length === 1) return redirect(posts[0].url)
    return {
      posts,
      city,
    }
  },
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
    this.$store.commit('setView', this.showablePosts)
    const polygons = this.showablePosts
      .map(p => p.polygons)
      .filter(p => p)
      .reduce((flatArray, p) => flatArray.concat(p), [])
    if (polygons.length > 0) this.$store.commit('setViewPolygons', polygons)
    this.$store.commit('setHighlight', this.showablePosts)
  },
  methods: {
    capitalize,
  },
}
</script>

<style scoped lang="scss"></style>
