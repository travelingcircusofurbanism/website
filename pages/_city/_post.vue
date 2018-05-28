<template>
  <section class="content">
  <div><nuxt-link to="/" exact>← Back to Home</nuxt-link></div>
    <div>
      {{ 
        new Date(date)
          .toLocaleDateString('en-US', 
            { year: 'numeric', month: 'long', day: 'numeric' })
      }}
    </div>
    <article class="markdown" v-html="markdownWithEasyImages"></article>
    <RelatedArticles :city="city" :current="slug" />
    <Footer/>
  </section>
</template>

<script>
import Footer from '~/components/Footer'
import RelatedArticles from '~/components/RelatedArticles'

export default {
  components: { Footer, RelatedArticles },
  asyncData ({ route, redirect, env }) {
    const slug = route.path.replace(/\/$/g, '')
    const path = '/posts' + slug + '/'
    let city = route.path.substring(1)
    city = city.substring(0, city.indexOf('/'))
    let data, md
    try {
      data = require(`~/static${ path }data.js`)
      md = require(`~/static${ path }content.md`)
    } catch (e) {
      console.log(path)
      return redirect('/')
    }
    return {
      path,
      slug,
      city,
      md,
      ...data,
    }
  },
  computed: {
    markdownWithEasyImages () {
      const baseMD = this.md
      let newMD = baseMD
      const imageElementRegex = /<img src=\"(?!http|www\.)\/?(?:(?:[^\/,"]+\/)*)(.+)\.(jpg|jpeg|png|gif|webm|svg)\"/gim
      let matches = imageElementRegex.exec(baseMD)
      while (matches != null) {
        newMD = newMD.replace(matches[0], `<img src="${ this.path }${ matches[1] }.${ matches[2] }"`)
        matches = imageElementRegex.exec(baseMD)
      }
      return newMD
    }
  },
  mounted () {
    // code to tell map to move to our location
    this.$store.commit('setMapPosition', this.mapPosition || {})
  }
}
</script>

<style lang="scss">

</style>
