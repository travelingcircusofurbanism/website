<template>
  <section class="content">
    <!--<div v-if="!isMobile" class="content-top-full mini gray">
      <Selector 
        :moreHint="false"
        :hide="city"
      />
    </div>-->
    <PostList
      :posts="showablePosts"
      :title="city"
    />
    <Footer/>
  </section>
</template>

<script>
import Footer from '~/components/Footer'
import PostList from '~/components/PostList'
// import Selector from '~/components/Selector'
import { capitalize } from '~/assets/commonFunctions.js'

export default {
  head () { 
    return { 
      title: this.capitalize(this.city),
      meta: [
        { property: 'og:title', content: `${ this.capitalize(this.city) } | Traveling Circus of Urbanism` },
        { property: 'og:type', content: 'website' },
        { property: 'og:description', content: 'Urban narratives and practices, collected through travel', hid: `description` },
        { property: 'og:url', content: `https://www.travelingcircusofurbanism.com/${ this.city }` },
        { property: 'og:image', content: `https://www.travelingcircusofurbanism.com/images/sitethumbnail.jpg` },
        { property: 'og:site_name', content: 'Traveling Circus of Urbanism' },
      ]
    }
  },
  components: { Footer, PostList, },
  asyncData ({ route, redirect, isStatic, store }) {
    const city = route.path
      .replace(/\//g, '')
      .replace(/_/g, ' ')
      .replace(/%20/g, ' ')
      .toLowerCase()
    let posts = store.state.allPosts
      .filter(p => p.city.toLowerCase() === city)
    if (isStatic) posts = posts.filter(p => p.public)
    if (!posts || posts.length === 0)
      return redirect('/')
    if (posts.length === 1)
      return redirect(posts[0].url)
    return {
      posts,
      city,
    }
  },
  computed: {
    isMobile () { return this.$store.state.isMobile },
    isDev () { return this.$store.state.isDev },
    userLanguage () { return this.$store.state.language },
		showablePosts () { 
			return this.userLanguage === 'en' ?
        this.posts.filter(p => p.languages['en'] === true) :
        this.posts
		},
  },
  beforeDestroy () {
    this.$store.commit('setHighlight')
  },
  mounted () {
    this.$store.commit('setPan', false)
    this.$store.commit('setView', this.showablePosts)
    this.$store.commit('setHighlight', this.showablePosts)
  },
  methods: {
    capitalize,
  }
}
</script>

<style scoped lang="scss">

</style>
