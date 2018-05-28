<template>
  <div class="relatedposts">
    <h4 class="sectionhead">Related posts from {{ city.substring(0,1).toUpperCase() + city.substring(1) }}</h4>
    <div class="postgrid">
      <nuxt-link
        v-for="(post, key) in postsToDisplay"
        :key="key"
        :to="post.url"
        class="relatedpost"
      >
        <div 
          class="relatedimage"
          :style="`
            background-image: url('${post.image}');
          `"
        ></div>
        <div>{{ post.title }}</div>
      </nuxt-link>
    </div>
  </div>
</template>


<script>

export default {
  props: [ 'city', 'current' ],
  data () {
    return {
      relatedPostCount: 3,
      allCityPosts: [],
    }
  },
  computed: {
    postsToDisplay () {
      const postsToDisplay = []
      for (let p of this.allCityPosts) {
        if (this.current !== p.url) postsToDisplay.push(p)
        if (postsToDisplay.length === this.relatedPostCount) return postsToDisplay
      }
      return postsToDisplay
    }
  },
  mounted () {
    if (!this.city) return
    try {
      this.allCityPosts = require(`~/static/${ this.city }.json`)
    } catch (e) { console.log(e) }
  }
}

</script>

<style lang="scss" scoped>
.relatedposts {
  margin-bottom: $unit * 10;
}

h4 {
  display: block;
  text-align: center;
}

.postgrid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: $unit * 3;
}

.relatedpost {
  display: block;
  height: 100%;
  text-decoration: none;
  color: $text !important;

  &:hover {
    text-decoration: underline;
  }
  
  .relatedimage {
    background-size: cover;
    height: $unit * 30;
    margin-bottom: $unit * 3;
  }
}

</style>
