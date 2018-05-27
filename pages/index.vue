<template>
  <section class="content">
    <h1 class="title">
      Recent posts
    </h1>
    <div v-for="(post, key) in shownPosts" :key="key" class="post-preview">
      <img :src="post.image" />
      <div>
        <nuxt-link :to="post.url">
          <h4>{{ post.title }}</h4>
        </nuxt-link>
        <div v-if="post.description">{{ post.description + '...' }}</div>
        <div>
          {{ 
            new Date(post.date)
              .toLocaleDateString('en-US', 
                { year: 'numeric', month: 'long', day: 'numeric' })
          }}
        </div>
        <div>City: {{ post.city.substring(0,1).toUpperCase() + post.city.substring(1) }}</div>
        <div>Tags: {{ post.tags.join(', ') }}</div>
      </div>
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
  computed: {
    shownPosts () { return this.posts.slice(0, 4) },
    
  },
  mounted () {
    this.$store.commit('setMapPosition')
  },
}
</script>

<style scoped lang="scss">

.post-preview {
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: 40% 1fr;
  grid-gap: 24px;
}

h4 {
  margin-top: 0;
  margin-bottom: 12px;
}

img {
  width: 100%;
}

</style>
