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

.post-preview {
  padding-bottom: $unit * 10;
  display: grid;
  grid-template-columns: 40% 1fr;
  grid-gap: $unit * 5;

  @include width (mid) {
    grid-template-columns: 1fr;

    img {
      max-height: $unit * 50;
      display: block;
      width: auto;
      margin: 0 auto;
    }
  }

  a {
    text-decoration: none;
  }

  .sublink {
    text-decoration: underline;
  }
}

h4 {
  color: $text !important;
  margin-top: 0;
  margin-bottom: 12px;
}


img {
  width: 100%;
}

</style>
