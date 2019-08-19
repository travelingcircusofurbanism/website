<template>
  <PostListPage :postListTitle="`#${tag}`" :posts="posts" />
</template>

<script>
import axios from 'axios'
import PostListPage from '~/components/PostListPage'
const { capitalize } = require('~/assets/commonFunctions.js')

export default {
  components: {
    PostListPage,
  },
  scrollToTop: true,
  head() {
    const meta = [
      {
        property: 'og:title',
        content: `${this.capitalize(this.tag)} | Traveling Circus of Urbanism`,
      },
      {
        property: 'og:url',
        content: `https://www.travelingcircusofurbanism.com/tag/${this.tag}`,
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
      title: this.capitalize(this.tag),
      meta,
    }
  },
  async asyncData({ route, redirect, error, store, app }) {
    const searchTag = decodeURIComponent(decodeURIComponent(route.path))
      .replace('/ja/', '/')
      .replace('/tag/', '')
      .replace(/%2F/g, '/')
      .toLowerCase()

    let tags = []
    if (process.server && !process.client) {
      // can just get data with fs on server
      let fs
      if (process.server) fs = require('fs')
      try {
        tags = JSON.parse(
          fs.readFileSync('./nuxt/static/generated/tags.json', 'utf8')
        )
      } catch (e) {
        console.log(e)
      }
    } else {
      // have to use axios on the browser. yes, asyncData runs between pages on the browser. idk why.
      try {
        const axiosConfig = {
          validateStatus: status => true,
        }
        await axios
          .get('/generated/tags.json', axiosConfig)
          .then(response => (tags = response.data))
          .catch(e => console.log(e))
      } catch (e) {
        console.log(e)
        return error({ statusCode: 404, message: 'Page not found.' })
      }
    }

    if (!tags.includes(searchTag))
      return error({ statusCode: 404, message: 'Page not found.' })

    let posts = store.viewingAsDev
      ? store.state.allPosts
      : store.state.currentShowablePosts
    // if (!posts || posts.length === 0)
    //   return error({ statusCode: 404, message: 'Page not found.' })
    posts = posts.filter(p => {
      return p.tags && p.tags.find(t => t.toLowerCase() === searchTag)
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
