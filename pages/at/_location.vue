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

export default {
  head() { return { title: this.capitalizeFirstLetter(this.location) } },
  components: { Footer, PostList, },
  asyncData ({ route, redirect }) {
    const location = route.path
      .replace('/at/', '')
      .replace('/', '')
      .toLowerCase()
    let posts = []
    try {
      posts = require(`~/static/posts.json`)
    } catch (e) { console.log(e) }
    if (!posts || posts.length === 0)
      return redirect('/')
    return {
      posts: posts.filter(p => {
          return p.location.toLowerCase() === location
        }),
      location,
    }
  },
  computed: {
    shownPosts () { return this.posts },
  },
  mounted () {
    this.$store.commit(
      'setMapMarkers',
      this.posts.map(p => ({
        position: p.mapPosition,
        locationName: p.location,
        title: p.title,
        url: p.url
      }))
    )
  },
  methods: {
    capitalizeFirstLetter (s) {
      if (!s) return ''
      return s.substring(0,1).toUpperCase() + s.substring(1)
    },
  }
}
</script>

<style scoped lang="scss">

</style>
