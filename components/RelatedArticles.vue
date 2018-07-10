<template>
  <div class="relatedposts" v-if="postsToDisplay.length > 0">
    <h4 class="sectionhead">More posts from {{ capitalize(city) }}</h4>
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
import { capitalize } from '~/assets/commonFunctions.js'

export default {
  props: [ 'city', 'current' ],
  data () {
    return {
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
    },
    relatedPostCount () {
      return this.$store.state.isMobile ? 2 : 3
    },
  },
  mounted () {
    if (!this.city) return
    try {
      this.allCityPosts = require(`~/static/generated/${ this.city.toLowerCase() }.json`)
        .filter(p => p.public === true)
    } catch (e) { console.log(e) }
  },
  methods: {
    capitalize,
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
  display: flex;
  
  @include width (mobile) {
    display: grid;
  }
}

.relatedpost {
  flex: 1;
  display: block;
  height: 100%;
  text-decoration: none;

  &:not(:last-of-type) {
    margin-right: $unit * 3;
  }

  @include width (mobile) {
    margin-bottom: $unit * 5;
    text-align: center;
    text-decoration: underline;
    
    &:not(:last-of-type) {
      margin-right: 0;
    }
  }

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
