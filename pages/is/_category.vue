<template>
  <section class="content">

    <Breadcrumb />
    
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
import Breadcrumb from '~/components/Breadcrumb'
// import Selector from '~/components/Selector'
const { capitalize } = require('~/assets/commonFunctions.js')

export default {
  head () { 
    return { 
      title: this.capitalize(this.category),
      meta: [
        { property: 'og:title', content: `${ this.capitalize(this.category) } | Traveling Circus of Urbanism` },
        { property: 'og:url', content: `https://www.travelingcircusofurbanism.com/is/${ this.category }` },
        { hid: `og:image`, property: 'og:image', 
          content: this.posts[0].image.substring(0, 4) === 'http' ?
            this.posts[0].image :
            `https://www.travelingcircusofurbanism.com${ this.posts[0].image }`
        },
      ]
    }
  },
  components: { Footer, PostList, Breadcrumb, },
  asyncData ({ route, redirect, error, isStatic, store }) {
    const category = decodeURI(route.path)
      .replace('/is/', '')
      .toLowerCase()
    let posts = isStatic ?
      store.state.allPublicPosts :
      store.state.allPosts
    if (!posts || posts.length === 0)
      return error({ statusCode: 404, message: 'Page not found.' })
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
