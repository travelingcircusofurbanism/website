<template>
  <div class="post-list">
    <h3 class="sectionhead" v-if="title">{{ title }}</h3>
    <div v-else class="spacer"></div>
    <transition-group name="fade">
      <PostPreview
        v-for="(post, key) in postsToShow"
        :key="key"
        v-bind="post"
        :class="{
          fade:
            post.public !== true ||
            MDYToDate(post.date).getTime() > new Date().getTime(),
        }"
      />
    </transition-group>
    <div
      class="button secondary full showall"
      v-if="shownPostCount < totalPosts"
      @click="shownPostCount += perPage"
    >Show more posts</div>
  </div>
</template>

<script>
import PostPreview from '~/components/PostPreview'
const { MDYToDate } = require('~/assets/commonFunctions.js')

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
  components: { PostPreview },
  data() {
    return {
      shownPostCount: this.perPage,
    }
  },
  computed: {
    isDev() {
      return this.$store.state.isDev
    },
    userLanguage() {
      return this.$store.state.language
    },
    showablePosts() {
      return this.posts.filter(p =>
        this.$store.state.currentShowablePosts.includes(p)
      )
    },
    totalPosts() {
      return this.showablePosts.length
    },
    postsToShow() {
      return this.showablePosts.slice(0, this.shownPostCount)
    },
  },
  mounted() {
    this.$el.parentNode.addEventListener('scroll', this.scroll)
  },
  beforeDestroy() {
    this.$el.parentNode.removeEventListener('scroll', this.scroll)
  },
  methods: {
    MDYToDate,
    showMore() {
      if (this.shownPostCount < this.showablePosts.length) {
        this.shownPostCount += this.perPage
        if (this.shownPostCount > this.showablePosts.length)
          this.shownPostCount = this.showablePosts.length
      }
    },
    scroll() {
      const contentBox = this.$el.parentNode
      const scrollDistanceLeft =
        this.$el.offsetHeight -
        (document.documentElement.clientHeight || window.innerHeight) -
        contentBox.scrollTop
      if (scrollDistanceLeft < 500) this.showMore()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/variables.scss';

.spacer {
  height: $unit * 10;
}
.fade {
  opacity: 0.4;
}
</style>
