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
				:class="{draft: post.public !== true}"
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
			shownPostCount: this.perPage,
    }
  },
  computed: {
		isDev () { return this.$store.state.isDev },
		showablePosts () { 
			return this.isDev ? 
				this.posts :
				this.posts.filter(p => p.public === true) 
		},
		totalPosts () { return this.showablePosts.length },
		postsToShow () { return this.showablePosts.slice(0, this.shownPostCount) },
  },
  mounted () {},
  methods: {
  }
}

</script>

<style lang="scss" scoped>

	.draft {
		opacity: .4;
	}

</style>
