<template>
  <section class="content">
    <h1 class="title">
      Recent posts
    </h1>
    <h3>Posts</h3>
    <div v-for="(post, key) in posts" :key="key">
      <nuxt-link :to="post.url">
        <h4>{{ post.title }}</h4>
      </nuxt-link>
      <div v-if="post.description">Description: {{ post.description }}</div>
      <div>{{ new Date(post.date).toLocaleString() }}</div>
      <div>Tags: {{ post.tags }}</div>
      <br />
    </div>
    <Footer/>
  </section>
</template>

<script>
import Footer from '~/components/Footer'

export default {
  components: { Footer, },
  asyncData () {
    return {
      posts: require('~/static/posts.json')
    }
  },
  mounted () {
    this.$store.commit('setMapPosition')
  }
}
</script>

<style scoped lang="scss">
</style>
