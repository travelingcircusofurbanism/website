<template>
  <PostListPage :postListTitle="location" :posts="posts" :marker="marker"/>
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
      this.location
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
  asyncData({ route, redirect, error, isStatic, store }) {
    const location = decodeURI(route.path)
      .replace('/at/', '')
      .replace(/\/$/, '')
      .toLowerCase()
    let posts = store.state.allPosts
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
  methods: {
    capitalize,
  },
}
</script>

<style scoped lang="scss"></style>
