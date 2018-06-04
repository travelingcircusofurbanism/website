<template>
  <section class="content">
    <CitySelector />
    <PostList
      :posts="posts"
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
    const allPosts = require('~/static/generated/posts.json')
    return {
      posts: allPosts,
      cityPosts: require(`~/static/generated/${allPosts[0].city}.json`)
    }
  },
  mounted () {
    this.$store.commit('setMapMarkers', this.cityPosts)
  }
}
</script>

<style scoped lang="scss">

</style>
