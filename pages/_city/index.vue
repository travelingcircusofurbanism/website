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
import { capitalize } from '~/assets/commonFunctions.js'

export default {
  head() { return { title: this.capitalize(this.city) } },
  components: { Footer, PostList, },
  asyncData ({ route, redirect }) {
    const city = route.path
      .replace('/', '')
      .replace('_', ' ')
      .replace('%20', ' ')
    let posts = []
    try {
      posts = require(`~/static/generated/${city}.json`)
    } catch (e) { console.log(e) }
    if (!posts || posts.length === 0)
      return redirect('/')
    return {
      posts,
      city,
    }
  },
  computed: {
    shownPosts () { return this.posts },
  },
  mounted () {
    this.$store.commit(
      'setMapMarkers', 
      window.location.href.indexOf('localhost:') > -1 ? 
        this.posts :
        this.posts.filter(p => p.public === true)
    )
  },
  methods: {
    capitalize,
  }
}
</script>

<style scoped lang="scss">

</style>
