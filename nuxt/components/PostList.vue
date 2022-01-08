<template>
  <div class="post-list">
    <SectionHeader v-if="title">{{
      capitalize(title)
    }}</SectionHeader>
    <transition-group name="fade" class="posts">
      <PostPreview
        v-for="(post, key) in postsToShow"
        :key="post.city + post.slug"
        v-bind="post"
      />
    </transition-group>
    <div
      class="button secondary full showall"
      v-if="shownPostCount < totalPosts"
      @click="shownPostCount += perPage"
    >
      Show more posts
    </div>
  </div>
</template>

<script>
import PostPreview from '~/components/PostPreview'
import SectionHeader from '~/components/SectionHeader'
const {
  capitalize,
} = require('~/assets/commonFunctions.js')

export default {
  props: {
    posts: {
      type: Array,
      required: true,
    },
    perPage: {
      type: Number,
      required: false,
      default: 8,
    },
    title: {
      type: String,
      required: false,
    },
  },
  components: { PostPreview, SectionHeader },
  data() {
    return {
      shownPostCount: this.perPage,
      scrollElement: null,
    }
  },
  computed: {
    isDev() {
      return this.$store.state.viewingAsDev
    },
    isMobile() {
      return this.$store.state.isMobile
    },
    userLanguage() {
      return this.$i18n.locale
    },
    showablePosts() {
      return this.posts.filter((p) =>
        this.$store.state.currentShowablePosts.find(
          (c) => c.city === p.city && c.slug === p.slug,
        ),
      )
    },
    totalPosts() {
      return this.showablePosts.length
    },
    postsToShow() {
      return this.showablePosts.slice(
        0,
        this.shownPostCount,
      )
    },
  },
  watch: {
    isMobile(isMobile) {
      this.scrollElement.removeEventListener(
        'scroll',
        this.scroll,
      )
      this.scrollElement = isMobile
        ? window
        : document.querySelector('.rightside')
      this.scrollElement.addEventListener(
        'scroll',
        this.scroll,
      )
    },
  },
  mounted() {
    this.scrollElement = this.isMobile
      ? window
      : document.querySelector('.rightside')
    this.scrollElement.addEventListener(
      'scroll',
      this.scroll,
    )
  },
  beforeDestroy() {
    this.scrollElement.removeEventListener(
      'scroll',
      this.scroll,
    )
  },
  methods: {
    capitalize,
    showMore() {
      if (this.shownPostCount < this.showablePosts.length) {
        this.shownPostCount += 1
        if (this.shownPostCount > this.showablePosts.length)
          this.shownPostCount = this.showablePosts.length
      }
    },
    scroll() {
      const contentBox = this.scrollElement
      const scrollDistanceLeft =
        this.$el.offsetHeight -
        (document.documentElement.clientHeight ||
          window.innerHeight) -
        (contentBox.scrollY || contentBox.scrollTop)
      if (scrollDistanceLeft < 500) this.showMore()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/variables.scss';

.posts {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  gap: $unit * 6 $unit * 3;

  @include width(mobile) {
    grid-template-columns: 1fr;
  }
}

.button.showall {
  margin-top: $unit * 6;
}
</style>
