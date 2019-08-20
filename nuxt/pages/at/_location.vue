<template>
  <PostListPage :postListTitle="location" :posts="posts" :marker="marker" />
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
  layout: 'default',
  head() {
    const description = `Urbanist case studies, interviews, and stories from ${this.capitalize(
      this.location
    )} on the Traveling Circus of Urbanism.`
    const meta = [
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
        hid: `og:url`,
        property: 'og:url',
        content: `https://www.travelingcircusofurbanism.com/at/${this.location}`,
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
    if (!this.posts || this.posts.length === 0) {
      meta.push({
        rel: 'canonical',
        href: `https://www.travelingcircusofurbanism.com${this.switchLocalePath(
          this.$i18n.locale === 'ja' ? 'en' : 'ja'
        )}`,
      })
      meta.push({
        name: 'robots',
        content: 'noindex',
      })
    }

    return {
      title: this.capitalize(this.location),
      meta,
    }
  },
  async asyncData({ route, redirect, error, store, app }) {
    const location = decodeURIComponent(decodeURIComponent(route.path)) // for some reason we have to do this twice
      .replace('/ja/', '/')
      .replace('/at/', '')
      .replace(/\/$/, '')
      .toLowerCase()

    let locations = []
    if (process.server && !process.client) {
      // can just get data with fs on server
      let fs
      if (process.server) fs = require('fs')
      try {
        locations = JSON.parse(
          fs.readFileSync('./nuxt/static/generated/locations.json', 'utf8')
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
          .get('/generated/locations.json', axiosConfig)
          .then(response => (locations = response.data))
          .catch(e => console.log(e))
      } catch (e) {
        console.log(e)
        return error({ statusCode: 404, message: 'Page not found.' })
      }
    }

    if (!locations.includes(location))
      return error({ statusCode: 404, message: 'Page not found.' })

    let posts = store.viewingAsDev
      ? store.state.allPosts
      : store.state.currentShowablePosts
    // if (!posts || posts.length === 0)
    //   return error({ statusCode: 404, message: 'Page not found.' })
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
    if (posts.length === 1)
      return redirect(
        app.localePath({
          name: 'city-post',
          params: { city: posts[0].city, post: posts[0].slug },
        })
      )
    return {
      posts,
      location,
      marker,
    }
  },
  created() {
    this.$store.commit('setBreadcrumbs', [
      {
        label: 'at: ' + this.location,
        url: this.localePath({
          name: 'at-location',
          params: { location: this.location },
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
