<template>
  <section class="content">
    <div class="top" v-if="!isMobile">
      <nuxt-link to="/" exact class="button secondary onwhite">← Back to Home</nuxt-link>
    </div>
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
  head () { return { title: this.capitalize(this.category) } },
  components: { Footer, PostList, },
  asyncData ({ route, redirect, isStatic }) {
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
    if (isStatic) posts = posts.filter(p => p.public)
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
    isMobile () { return this.$store.state.isMobile },
  },
  mounted () {
    this.$store.commit('setMapMarkers', this.posts)
  },
  methods: {
    capitalize,
  }
}
</script>

<style scoped lang="scss">

</style>
