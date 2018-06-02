<template>
  <div
    class="post-list"
  >
		<h3 class="sectionhead" v-if="title">{{ title }}</h3>
		<PostPreview
			v-for="(post, key) in postsToShow"
			:key="key"
			v-bind="post"
		/>
		<div 
			class="show-more button secondary full"
			v-if="shownPostCount < totalPosts"
			@click="shownPostCount += perPage"
		>
			Show more posts
    </div>
  </div>
</template>


<script>
import PostPreview from '~/components/PostPreview'

export default {
  props: {
		posts: {
			type: Array,
			required: true
		}, 
		perPage: {
			type: Number,
			required: false,
			default: 5
		},
		title: {
			type: String,
			required: false
		},
	},
	components: { PostPreview, },
  data () {
    return {
			shownPostCount: this.perPage
    }
  },
  computed: {
		totalPosts () { return this.posts.length },
		postsToShow () { return this.posts.slice(0, this.shownPostCount) },
  },
  mounted () {
  },
  methods: {
  }
}

</script>

<style lang="scss" scoped>

</style>
