<template>
  <section class="content">
    <h1 class="title">
      myfirstfunnuxtproject
    </h1>
    <h2 class="subtitle">
      Nuxt.js project
    </h2>
    <h3>Posts</h3>
    <div v-for="(post, key) in posts" :key="key">
      <nuxt-link :to="post.url">
        <h4>{{ post.title }}</h4>
      </nuxt-link>
      <div>{{ new Date(post.date).toLocaleString() }}</div>
      <div>Tags: {{ post.tags }}</div>
      <br />
    </div>
    <div class="links">
      <nuxt-link to="/about">About</nuxt-link>
    </div>
  </section>
</template>

<script>

export default {
  components: {},
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
