<template>
  <section class="content">

    <Breadcrumb />
    
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
import Breadcrumb from '~/components/Breadcrumb'
// import Selector from '~/components/Selector'
import { capitalize } from '~/assets/commonFunctions.js'

export default {
  head () { 
    const description = `Urbanist case studies, interviews, and stories from ${ this.capitalize(this.city) } on the Traveling Circus of Urbanism.`
    return { 
      title: this.capitalize(this.city),
      meta: [
        { property: 'og:title', content: `${ this.capitalize(this.city) } | Traveling Circus of Urbanism` },
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:description', property: 'og:description', content: description },
        { property: 'og:url', content: `https://www.travelingcircusofurbanism.com/${ this.city }` },
        { property: 'og:image', 
          content: this.posts[0].image.substring(0, 4) === 'http' ?
            this.posts[0].image :
            `https://www.travelingcircusofurbanism.com${ this.posts[0].image }`
        },
      ]
    }
  },
  components: { Footer, PostList, Breadcrumb, },
  asyncData ({ route, redirect, error, isStatic, store }) {
    const city = route.path
      .replace(/\//g, '')
      .replace(/_/g, ' ')
      .replace(/%20/g, ' ')
      .toLowerCase()
    let posts = store.state.allPosts
      .filter(p => p.city.toLowerCase() === city)
    if (isStatic) posts = posts.filter(p => p.public)
    if (!posts || posts.length === 0)
      return error({ statusCode: 404, message: 'Page not found.' })
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
