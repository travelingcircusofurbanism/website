<template>
  <div
    class="post-list"
  >
		<h3 class="sectionhead" v-if="title">{{ title }}</h3>
		<transition-group name="fade">
			<PostPreview
				v-for="(post, key) in postsToShow"
				:key="key"
				v-bind="post"
				:class="{fade: post.public !== true || MDYToDate(post.date).getTime() > new Date().getTime()}"
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
      return this.isDev
        ? this.posts
        : this.userLanguage === 'en'
          ? this.posts.filter(
              p =>
                p.public === true &&
                p.languages['en'] === true &&
                MDYToDate(p.date).getTime() < new Date().getTime()
            )
          : this.posts.filter(
              p =>
                p.public === true &&
                MDYToDate(p.date).getTime() < new Date().getTime()
            )
    },
    totalPosts() {
      return this.showablePosts.length
    },
    postsToShow() {
      return this.showablePosts.slice(0, this.shownPostCount)
    },
  },
  methods: {
    MDYToDate,
  },
}
</script>

<style lang="scss" scoped>
.fade {
  opacity: 0.4;
}
</style>
