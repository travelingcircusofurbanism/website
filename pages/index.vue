<template>
  <section class="content">
    <div class="intro">
      <strong>This is a blog by <nuxt-link to="/author" exact class="subtle">Mariko Sugita</nuxt-link>,</strong> city enthusiast and nomadic urban researcher. It's about urban culture, design, planning, history, spaces, and more – <strong>all about cities!</strong>
    </div>
    <CitySelector />
    <PostList
      :posts="posts"
      title="Recent Posts"
    />
    <Footer/>
  </section>
</template>

<script>
import Footer from '~/components/Footer'
import PostList from '~/components/PostList'
import CitySelector from '~/components/CitySelector'

export default {
  head() { return { title: 'Home' } },
  components: { Footer, PostList, CitySelector, },
  asyncData () {
    const allPosts = require('~/static/generated/posts.json')
    return {
      posts: allPosts,
      cityPosts: require(`~/static/generated/${allPosts[0].city}.json`)
    }
  },
  mounted () {
    this.$store.commit('setMapMarkers', this.cityPosts)
  }
}
</script>

<style scoped lang="scss">

  .intro {
    margin: $content-padding * -1;
    margin-bottom: $content-padding * 1;
    padding: $content-padding * 1.5;
    background: lighten($offwhite, 10%);//linear-gradient($offwhite, $offwhite, rgba($offwhite, 0));
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
