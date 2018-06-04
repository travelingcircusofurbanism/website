<template>
  <section class="content">
    <PostList
      :posts="posts"
      :title="category"
    />
    <Footer/>
  </section>
</template>

<script>
import Footer from '~/components/Footer'
import PostList from '~/components/PostList'
import { capitalize } from '~/assets/commonFunctions.js'

export default {
  head() { return { title: this.capitalize(this.category) } },
  components: { Footer, PostList, },
  asyncData ({ route, redirect }) {
    const category = route.path
      .replace('/is/', '')
      .replace('/', '')
      .replace('_', ' ')
      .replace('%20', ' ')
      .toLowerCase()
    let posts = []
    try {
      posts = require(`~/static/generated/posts.json`)
    } catch (e) { console.log(e) }
    if (!posts || posts.length === 0)
      return redirect('/')
    posts = posts.filter(p => {
      return p.category &&
        p.category.toLowerCase() === category
    })
    if (posts.length === 1)
      return redirect(posts[0].url)
    return {
      posts,
      category,
    }
  },
  computed: {
    shownPosts () { return this.posts },
  },
  mounted () {
    this.$store.commit ('setMapMarkers', this.posts)
  },
  methods: {
    capitalize,
  }
}
</script>

<style scoped lang="scss">

</style>
