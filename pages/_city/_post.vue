<template>
  <section class="content">
    <div class="top">
      <nuxt-link to="/" exact class="button secondary">← Back to Home</nuxt-link>
    </div>
    <PostDetails
      :category="category"
      :mapPosition="mapPosition"
      :city="city"
      :date="date"
    />
    <article class="markdown" v-html="editedMarkdown"></article>
    <RelatedArticles :city="city" :current="slug" />
    <Footer/>
  </section>
</template>

<script>
import Footer from '~/components/Footer'
import PostDetails from '~/components/PostDetails'
import RelatedArticles from '~/components/RelatedArticles'
import { capitalize } from '~/assets/commonFunctions.js'

export default {
  head() { return { title: this.capitalize(this.title) } },
  components: { Footer, RelatedArticles, PostDetails },
  asyncData ({ route, redirect, env }) {
    const slug = route.path.replace(/\/$/g, '')
      .replace('%20', ' ')
    const path = '/posts' + slug + '/'
    let city = route.path.substring(1)
    city = city.substring(0, city.indexOf('/'))
      .replace('%20', ' ')
    let data, md
    try {
      data = require(`~/static${ path }data.js`)
      md = require(`~/static${ path }content.md`)
    } catch (e) {
      console.log('Error: Unable to find data for ' + path)
      return redirect('/')
    }
    const title = /<h1>(.*)<\/h1>/g.exec(md)[1]
    return {
      path,
      slug,
      city,
      md,
      title,
      ...data,
    }
  },
  data () {
    return {
      mapPosition: this.mapPosition || {}
    }
  },
  computed: {
    editedMarkdown () {
      const baseMD = this.md
      let newMD = baseMD
      // fix images
      const imageElementRegex = /<img src=\"(?!http|www\.)\/?(?:(?:[^\/,"]+\/)*)(.+)\.(jpg|jpeg|png|gif|webm|svg)\"/gim
      let matches = imageElementRegex.exec(baseMD)
      while (matches != null) {
        newMD = newMD.replace(matches[0], `<img src="${ this.path }resized/${ matches[1] }.${ matches[2] }"`)
        matches = imageElementRegex.exec(baseMD)
      }
      // fix external links
      newMD = newMD.replace(/<a href="(.*)">/g, 
        (match, url) => `<a ${ url.indexOf('travelingcircusofurbanism.com') === -1 ? 'target="_blank"' : '' } href="${ url }">`
      )
      return newMD
    }
  },
  mounted () {
    this.$store.commit('setMapMarkers', this.mapPosition)
    this.$store.commit('setHighlight', this.mapPosition)
  },
  beforeDestroy () {
    this.$store.commit('setHighlight')
  },
  methods: {
    capitalize,
  }
}
</script>

<style lang="scss" scoped>

.top {
  margin-bottom: $unit * 8 ;
  margin-top: $unit * 2;
}

</style>
