<template>
  <section class="content">
    <!--<div v-if="!isMobile" class="content-top-full mini gray">
      <Selector
        type="category"
        title="Categories"
        :moreHint="false"
        urlPrefix="is/"
        :hide="category"
      />
    </div>-->
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
// import Selector from '~/components/Selector'
import { capitalize } from '~/assets/commonFunctions.js'

export default {
  head () { return { title: this.capitalize(this.category) } },
  components: { Footer, PostList, },
  asyncData ({ route, redirect, isStatic, store }) {
    const category = route.path
      .replace('/is/', '')
      .replace('/', '')
      .replace('_', ' ')
      .replace('%20', ' ')
      .toLowerCase()
    let posts = isStatic ?
      store.state.allPublicPosts :
      store.state.allPosts
    if (!posts || posts.length === 0)
      return redirect('/')
    posts = posts.filter(p => {
      return p.category && p.category.toLowerCase() === category
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
    isDev () { return this.$store.state.isDev },
    userLanguage () { return this.$store.state.language },
		showablePosts () { 
			return this.userLanguage === 'en' ?
        this.posts.filter(p => p.languages['en'] === true) :
        this.posts
		},
  },
  mounted () {
    this.$store.commit('setPan', false)
    this.$store.commit('setView', this.showablePosts)
    this.$store.commit('setHighlight', [].concat.apply(
      [], this.showablePosts
        .map(p => p.mapPosition)
        .filter(p => p)
    ))
  },
  methods: {
    capitalize,
  }
}
</script>

<style scoped lang="scss">

</style>
