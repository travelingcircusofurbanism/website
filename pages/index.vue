<template>
  <section class="content">
    <CitySelector />
    <PostList
      :posts="shownPosts"
      title="Recent Posts"
    />
    <Footer/>
  </section>
</template>

<script>
import Footer from '~/components/Footer'
import PostList from '~/components/PostList'
import CitySelector from '~/components/CitySelector'

export default {
  head() { return { title: 'Home' } },
  components: { Footer, PostList, CitySelector, },
  asyncData () {
    const allPosts = require('~/static/posts.json')
    return {
      posts: allPosts,
      cityPosts: require(`~/static/${allPosts[0].city}.json`)
    }
  },
  computed: {
    shownPosts () { return this.posts/*.slice(0, 4)*/ },
  },
  mounted () {
    this.$store.commit(
      'setMapMarkers',
      this.cityPosts.map(p => ({
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
