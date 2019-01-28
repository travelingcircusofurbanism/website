<template>
  <section class="content">
    <Breadcrumb />
    <PostList :posts="posts" :title="location" />
    <ContentFooter />
  </section>
</template>

<script>
import ContentFooter from '~/components/Footer'
import PostList from '~/components/PostList'
import Breadcrumb from '~/components/Breadcrumb'
const { capitalize } = require('~/assets/commonFunctions.js')

export default {
  head() {
    const description = `Urbanist case studies, interviews, and stories from ${this.capitalize(
      this.city
    )} on the Traveling Circus of Urbanism.`
    return {
      title: this.capitalize(this.location),
      meta: [
        {
          property: 'og:title',
          content: `${this.capitalize(
            this.location
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
          content: `https://www.travelingcircusofurbanism.com/at/${
            this.location
          }`,
        },
        {
          hid: `og:image`,
          property: 'og:image',
          content:
            this.posts[0] && this.posts[0].image
              ? this.posts[0].image.substring(0, 4) === 'http'
                ? this.posts[0].image
                : `https://www.travelingcircusofurbanism.com${
                    this.posts[0].image
                  }`
              : '',
        },
      ],
    }
  },
  components: { ContentFooter, PostList, Breadcrumb },
  asyncData({ route, redirect, error, isStatic, store }) {
    const location = decodeURI(route.path)
      .replace('/at/', '')
      .toLowerCase()
    let posts = isStatic ? store.state.allPublicPosts : store.state.allPosts
    if (!posts || posts.length === 0)
      return error({ statusCode: 404, message: 'Page not found.' })
    let marker = {}
    posts = posts.filter(p => {
      const toCheck = (Array.isArray(p.mapPosition)
        ? p.mapPosition
        : [p.mapPosition]
      )
        .concat(p.polygons)
        .filter(p => p)
      if (toCheck.length > 0) {
        const found = toCheck.find(
          singlePosition =>
            singlePosition.location &&
            singlePosition.location.toLowerCase() === location
        )
        if (found) marker = found
        return found
      }
    })
    // if (posts.length === 1) return redirect(posts[0].url)
    return {
      posts,
      location,
      marker,
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile
    },
  },
  mounted() {
    this.$store.commit('setPan', false)
    this.$store.commit('setView', this.marker)
    this.$store.commit('setHighlight', this.marker)
  },
  methods: {
    capitalize,
  },
}
</script>

<style scoped lang="scss"></style>
