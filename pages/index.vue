<template>
  <section class="content">
  <div class="intro" v-if="showIntro">
      <strong>This is a blog by <nuxt-link to="/author" exact class="subtle">Mariko Sugita</nuxt-link>,</strong> city enthusiast and nomadic urban researcher. It's about urban culture, design, planning, history, spaces, and more – <strong>all about cities!</strong>
    </div>
    <div class="content-top-full mini gray">
      <Selector />
      <Selector
        type="category"
        title="Categories"
        :moreHint="false"
        urlPrefix="is/"
      />
    </div>
    <PostList
      :posts="showablePosts"
      title="Recent Posts"
    />
    <Footer/>
  </section>
</template>

<script>
import Footer from '~/components/Footer'
import PostList from '~/components/PostList'
import Selector from '~/components/Selector'
const { get, set } = require('~/assets/storage').default

export default {
  head() { return { title: 'Home' } },
  components: { Footer, PostList, Selector, },
  asyncData ({ isStatic }) {
    let allPosts = require('~/static/generated/posts.json')
    if (isStatic) allPosts = allPosts.filter(p => p.public)
    const firstShownPost = allPosts.find(p => p.languages.en && p.public)
    let cityPosts = require(`~/static/generated/${firstShownPost.city}.json`)
    if (isStatic) cityPosts = cityPosts.filter(p => p.public)
    return {
      posts: allPosts,
      cityPosts: cityPosts
    }
  },
  data () {
    return {
      showIntro: false,
    }
  },
  computed: {
    isMobile () { return this.$store.state.isMobile },
    isDev () { return this.$store.state.isDev },
    userLanguage () { return this.$store.state.language },
		showablePosts () { 
			return this.isDev ?
				this.posts :
				this.userLanguage === 'en' ?
					this.posts.filter(p => p.public === true && p.languages['en'] === true) :
					this.posts.filter(p => p.public === true)
		},
    showableCityPosts () {
      return this.isDev ?
				this.cityPosts :
				this.userLanguage === 'en' ?
					this.cityPosts.filter(p => p.public === true && p.languages['en'] === true) :
					this.cityPosts.filter(p => p.public === true)
    }
  },
  mounted () {
    this.$nextTick(() => this.$store.commit('setMapMarkers', this.showableCityPosts) )
    if (!this.get('visited')) {
      this.showIntro = true
      this.set('visited', true)
    }
  },
  methods: {
    get, set,
  }
}
</script>

<style scoped lang="scss">

  .intro {
    margin: $content-padding * -1;
    padding: $content-padding * 1.5;
    background: $shade;
    line-height: 1.4;
    color: darken($offwhite, 60%);
    text-align: center;
    font-size: 1.2rem;

    @include width (mobile) {
      margin: $content-padding-mobile * -1;
      margin-bottom: $content-padding-mobile * 1;
      padding: $content-padding-mobile * 1.5;
    }
  }

</style>
