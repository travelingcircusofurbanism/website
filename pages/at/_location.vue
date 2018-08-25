<template>
  <section class="content">

    <Breadcrumb />

    <PostList
      :posts="posts"
      :title="location"
    />
    <Footer/>
  </section>
</template>

<script>
import Footer from '~/components/Footer'
import PostList from '~/components/PostList'
import Breadcrumb from '~/components/Breadcrumb'
import { capitalize } from '~/assets/commonFunctions.js'

export default {
  head () { 
    return { 
      title: this.capitalize(this.location),
      meta: [
        { property: 'og:title', content: `${ this.capitalize(this.location) } | Traveling Circus of Urbanism` },
        { property: 'og:type', content: 'website' },
        { property: 'og:description', content: 'Urban narratives and practices, collected through travel', hid: `description` },
        { property: 'og:url', content: `https://www.travelingcircusofurbanism.com/at/${ this.location }` },
        { property: 'og:image', 
          content: this.posts[0] && this.posts[0].image ? 
            this.posts[0].image.substring(0, 4) === 'http' ?
              this.posts[0].image :
              `https://www.travelingcircusofurbanism.com${ this.posts[0].image }`
            : ''
        },
        { property: 'og:site_name', content: 'Traveling Circus of Urbanism' },
      ]
    }
  },
  components: { Footer, PostList, Breadcrumb, },
  asyncData ({ route, redirect, isStatic, store }) {
    const location = route.path
      .replace('/at/', '')
      .replace('/', '')
      .replace('_', ' ')
      .replace(/%20/g, ' ')
      .toLowerCase()
    let posts = isStatic ?
      store.state.allPublicPosts :
      store.state.allPosts
    if (!posts || posts.length === 0)
      return redirect('/')
    let marker = {}
    posts = posts.filter(p => {
        if (Array.isArray(p.mapPosition)) {
          const found = p.mapPosition.find(singlePosition => 
            singlePosition.location &&
            singlePosition.location.toLowerCase() === location
          )
          if (found) marker = found
          return found
        }
        else {
          const found = p.mapPosition && 
            p.mapPosition.location && 
            p.mapPosition.location.toLowerCase() === location
          if (found) marker = p.mapPosition
          return found
        }
      })
    if (posts.length === 1)
      return redirect(posts[0].url)
    return {
      posts,
      location,
      marker,
    }
  },
  computed: {
    isMobile () { return this.$store.state.isMobile },
  },
  mounted () {
    this.$store.commit('setPan', false)
    this.$store.commit('setView', this.marker)
    this.$store.commit('setHighlight', this.marker)
  },
  methods: {
    capitalize,
  }
}
</script>

<style scoped lang="scss">

</style>
