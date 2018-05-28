<template>
  <section class="content">
    <h3 class="sectionhead">
      Recent posts
    </h3>
    <PostPreview
      v-for="(post, key) in shownPosts"
      :key="key"
      v-bind="post"
    />
    <Footer/>
  </section>
</template>

<script>
import Footer from '~/components/Footer'
import PostPreview from '~/components/PostPreview'

export default {
  components: { Footer, PostPreview, },
  asyncData () {
    return {
      posts: require('~/static/posts.json')
    }
  },
  computed: {
    shownPosts () { return this.posts.slice(0, 4) },
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
