<template>
  <section class="content">
    <PostList
      :posts="posts"
      :title="city"
    />
    <Footer/>
  </section>
</template>

<script>
import Footer from '~/components/Footer'
import PostList from '~/components/PostList'

export default {
  components: { Footer, PostList, },
  asyncData ({ route, redirect }) {
    const city = route.path.replace('/', '')
    let posts = []
    try {
      posts = require(`~/static/${city}.json`)
    } catch (e) { console.log(e) }
    if (!posts || posts.length === 0)
      return redirect('/')
    return {
      posts,
      city,
    }
  },
  computed: {
    shownPosts () { return this.posts/*.slice(0, 4)*/ },
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
  }
}
</script>

<style scoped lang="scss">

</style>
