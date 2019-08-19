<template>
  <section class="content">
    <PostList :posts="showablePosts" title="Recent Posts" />
    <ContentFooter />
  </section>
</template>

<script>
import ContentFooter from '~/components/Footer'
import PostList from '~/components/PostList'

export default {
  scrollToTop: true,
  name: 'index',
  layout: 'default',
  head() {
    return {
      title: 'Home',
      meta: [
        { property: 'og:title', content: 'Traveling Circus of Urbanism' },
        {
          property: 'og:url',
          content: `https://www.travelingcircusofurbanism.com/`,
        },
        {
          name: `google-site-verification`,
          content: `-Bj3TQCPSg-RgBnJo1xQc7u3Zm6sHiu70lcvUpurJhU`,
        },
      ],
    }
  },
  components: {
    ContentFooter,
    PostList,
  },
  asyncData({ store }) {
    let posts = store.state.allPosts
    return {
      posts,
    }
  },
  data() {
    return {
      showIntro: false,
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile
    },
    isDev() {
      return this.$store.state.viewingAsDev
    },
    userLanguage() {
      return this.$i18n.locale
    },
    showablePosts() {
      return this.posts.filter(p =>
        this.$store.state.currentShowablePosts.includes(p)
      )
    },
  },
  created() {
    this.$store.commit('setBreadcrumbs', [])
  },
  mounted() {
    this.$store.commit('setPan', true)
    this.$store.commit('setView', this.showablePosts)
    this.$store.commit('setHighlight')
  },
  methods: {},
}
</script>

<style scoped lang="scss">
@import '~/assets/variables.scss';
</style>
