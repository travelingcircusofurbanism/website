<template>
  <div class="post-list">
    <h3 class="sectionhead" v-if="title">{{ capitalize(title) }}</h3>
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
const { capitalize } = require('~/assets/commonFunctions.js')

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
  watch: {
    isMobile(isMobile) {
      this.scrollElement.removeEventListener('scroll', this.scroll)
      this.scrollElement = isMobile
        ? document.querySelector('body')
        : this.$el.parentNode
      this.scrollElement.addEventListener('scroll', this.scroll)
    },
  },
  mounted() {
    this.scrollElement = this.isMobile ? window : this.$el.parentNode
    this.scrollElement.addEventListener('scroll', this.scroll)
  },
  beforeDestroy() {
    this.scrollElement.removeEventListener('scroll', this.scroll)
  },
  methods: {
    MDYToDate,
    capitalize,
    showMore() {
      if (this.shownPostCount < this.showablePosts.length) {
        this.shownPostCount += this.perPage
        if (this.shownPostCount > this.showablePosts.length)
          this.shownPostCount = this.showablePosts.length
      }
    },
    scroll() {
      const contentBox = this.scrollElement
      const scrollDistanceLeft =
        this.$el.offsetHeight -
        (document.documentElement.clientHeight || window.innerHeight) -
        contentBox.scrollTop
      console.log(scrollDistanceLeft)
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
