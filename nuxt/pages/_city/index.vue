<template>
  <PostListPage :postListTitle="city" :posts="posts" />
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
    const meta = [
      {
        property: 'og:title',
        content: `${this.capitalize(this.city)} | Traveling Circus of Urbanism`,
      },
      { hid: 'description', name: 'description', content: description },
      {
        hid: 'og:description',
        property: 'og:description',
        content: description,
      },
      {
        hid: `og:url`,
        property: 'og:url',
        content: `https://www.travelingcircusofurbanism.com/${this.city}`,
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
      title: this.capitalize(this.city),
      meta,
    }
  },
  asyncData({ route, redirect, error, store, app }) {
    const city = decodeURIComponent(decodeURIComponent(route.path)) // don't ask
      .replace('/ja/', '/')
      .replace(/\//g, '')
      .replace(/\/$/, '')
      .replace(/%2F/g, '/')
      .toLowerCase()
    let posts = (store.viewingAsDev
      ? store.state.allPosts
      : store.state.currentShowablePosts
    ).filter(p => p.city.toLowerCase() === city)

    if (city == '404')
      return error({ statusCode: 404, message: 'Page not found.' })

    if (posts.length === 1)
      return redirect(
        app.localePath({
          name: 'city-post',
          params: { city, post: posts[0].slug },
        })
      )
    return {
      posts,
      city,
    }
  },
  data() {},
  computed: {},
  created() {
    this.$store.commit('setBreadcrumbs', [
      {
        label: this.city,
        url: this.localePath({
          name: 'city',
          params: { city: this.city },
        }),
      },
    ])
  },
  methods: { capitalize },
}
</script>

<style scoped lang="scss"></style>
