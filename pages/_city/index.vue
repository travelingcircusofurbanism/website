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
      this.posts.map(p => (Array.isArray(p.mapPosition)) ?
        p.mapPosition.map(singlePosition => ({
          position: { ...singlePosition },
          locationName: singlePosition.location
        })) :
        [{
          position: { ...p.mapPosition },
          locationName: p.mapPosition.location
        }]
      ).reduce((accumulator, currentValue) => 
        accumulator.concat(currentValue)
      )
    )
  },
  methods: {
    capitalize,
  }
}
</script>

<style scoped lang="scss">

</style>
