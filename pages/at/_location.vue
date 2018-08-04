<template>
  <section class="content">
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
import { capitalize } from '~/assets/commonFunctions.js'

export default {
  head() { return { title: this.capitalize(this.location) } },
  components: { Footer, PostList, },
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
