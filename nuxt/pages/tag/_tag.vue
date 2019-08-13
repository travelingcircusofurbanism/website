<template>
  <PostListPage :postListTitle="`#${tag}`" :posts="posts" />
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
    return {
      title: this.capitalize(this.tag),
      meta: [
        {
          property: 'og:title',
          content: `${this.capitalize(
            this.tag
          )} | Traveling Circus of Urbanism`,
        },
        {
          property: 'og:url',
          content: `https://www.travelingcircusofurbanism.com/tag/${this.tag}`,
        },
        {
          hid: `og:image`,
          property: 'og:image',
          content:
            this.posts[0].image.substring(0, 4) === 'http'
              ? this.posts[0].image
              : `https://www.travelingcircusofurbanism.com${this.posts[0].image}`,
        },
      ],
    }
  },
  asyncData({ route, redirect, error, store }) {
    const searchTag = decodeURIComponent(decodeURIComponent(route.path))
      .replace('/ja/', '/')
      .replace('/tag/', '')
      .replace(/%2F/g, '/')
      .toLowerCase()
    let posts = store.state.allPosts
    if (!posts || posts.length === 0)
      return error({ statusCode: 404, message: 'Page not found.' })
    posts = posts.filter(p => {
      return p.tags && p.tags.find(t => t.toLowerCase() === searchTag)
    })
    if (posts.length === 1) return redirect(posts[0].url)
    return {
      posts,
      tag: searchTag,
    }
  },
  created() {
    this.$store.commit('setBreadcrumbs', [
      {
        label: '#' + this.tag,
        url: this.localePath({
          name: 'tag-tag',
          params: { tag: this.tag },
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
