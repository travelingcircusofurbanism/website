<template>
  <PostListPage :postListTitle="category" :posts="posts" />
</template>

<script>
import PostListPage from '~/components/PostListPage'
const { capitalize } = require('~/assets/commonFunctions.js')

//TODO double highlights some stuff when navigating around between /is/ pages

export default {
  components: {
    PostListPage,
  },
  scrollToTop: true,
  head() {
    const meta = [
      {
        property: 'og:title',
        content: `${this.capitalize(
          this.category
        )} | Traveling Circus of Urbanism`,
      },
      {
        property: 'og:url',
        content: `https://www.travelingcircusofurbanism.com/is/${this.category}`,
      },
      {
        hid: `og:image`,
        property: 'og:image',
        content: this.posts[0]
          ? this.posts[0].image.substring(0, 4) === 'http'
            ? this.posts[0].image
            : `https://www.travelingcircusofurbanism.com${this.posts[0].image}`
          : 'https://www.travelingcircusofurbanism.com/assets/sitethumbnail.jpg',
      },
    ]
    if (!this.posts || this.posts.length === 0)
      meta.push({
        rel: 'canonical',
        href: `https://www.travelingcircusofurbanism.com${this.switchLocalePath(
          this.$i18n.locale === 'ja' ? 'en' : 'ja'
        )}`,
      })
    return {
      title: this.capitalize(this.category),
      meta,
    }
  },
  asyncData({ route, redirect, error, store, app }) {
    const category = decodeURIComponent(route.path)
      .replace('/ja/', '/')
      .replace('/is/', '')
      .replace(/%2F/g, '/')
      .toLowerCase()
    let posts = store.viewingAsDev
      ? store.state.allPosts
      : store.state.currentShowablePosts
    // if (!posts || posts.length === 0)
    //   return error({ statusCode: 404, message: 'Page not found.' })
    posts = posts.filter(p => {
      return p.category && p.category.toLowerCase() === category
    })
    if (posts.length === 1)
      return redirect(
        app.localePath({
          name: 'city-post',
          params: { city: posts[0].city, post: posts[0].slug },
        })
      )
    return {
      posts,
      category,
    }
  },
  created() {
    this.$store.commit('setBreadcrumbs', [
      {
        label: 'is: ' + this.category,
        url: this.localePath({
          name: 'is-category',
          params: { category: this.category },
        }),
      },
    ])
  },
  methods: {
    capitalize,
  },
}
</script>

<style scoped lang="scss"></style>
