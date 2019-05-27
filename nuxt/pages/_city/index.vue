<template>
  <PostListPage :postListTitle="city" :posts="posts"/>
</template>

<script>
import PostListPage from '~/components/PostListPage'
const { capitalize } = require('~/assets/commonFunctions.js')

export default {
  components: {
    PostListPage,
  },
  scrollToTop: true,
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
  data() {},
  computed: {},
  methods: {
    capitalize,
  },
}
</script>

<style scoped lang="scss"></style>
