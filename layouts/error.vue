<template>
  <div class="master">
    <div class="error-center">
      <div class="content">
        <h1 v-if="error.statusCode === 404">We haven't traveled there yet!</h1>
        <h1 v-else>An error occurred</h1>
        <!--<br />
        <div v-if="error.statusCode === 404">That page wasn't found, sorry.</div>
        <br /> -->
        <h4>You can go <a href="/">back to home</a>, <br />or you can check out this random post:</h4>
        <br />
        <div class="leftalign">
          <PostList 
            :posts="randomPosts"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostList from '~/components/PostList'
import axios from 'axios'

export default {
  props: ['error'],
  data () {
    return {
      randomPosts: [],
    }
  },
  components: { PostList, },
  computed: {
  },
  async created () {
    if (!process.browser) return
    const axiosConfig = {
      validateStatus: status => true,
    }
    axios.get('/generated/posts.json', axiosConfig)
      .then(response => {
        const posts = response.data
          .filter(p => p.public)
        this.randomPosts = [posts[Math.floor(Math.random() * posts.length)]]
      })
      .catch(e => console.log(e))
  },
  methods: {
  }
}

</script>

<style lang="scss">

  .content {
    height: auto;
    min-height: 0;
  }

  .error-center {
    text-align: center;
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .leftalign {
    text-align: left;
  }

  .master {
    display: flex;
    overflow: hidden;
    width: 100vw;
    height: 100vh;

    & > * {
      flex: 1;
      max-width: 50%;
      overflow: hidden;
      overflow-y: auto;
      height: 100vh;
    }

    @include width (mobile) {
      display: block;
      height: auto;

      & > * {
        max-width: 100%;
        overflow-y: visible;
        height: auto;
      }
    }
  }

</style>
