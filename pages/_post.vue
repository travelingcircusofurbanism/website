<template>
  <section class="content">
    <h1>{{ title }}</h1>
    <h3>
      {{ 
        new Date(date)
          .toLocaleDateString('en-US', 
            { year: 'numeric', month: 'long', day: 'numeric' })
      }}
    </h3>
    <h4>Tags: {{ tags.join(', ') }}</h4>
    <article class="markdown" v-html="markdownWithEasyImages"></article>
    <Footer/>
  </section>
</template>

<script>
import Footer from '~/components/Footer'

export default {
  components: { Footer, },
  asyncData ({ route, redirect, env }) {
    const path = '/posts/' + route.path
      .replace(/\//g, '') + '/'
    let data, md
    try {
      data = require(`~/static${ path }data.js`)
      md = require(`~/static${ path }content.md`)
    } catch (e) {
      return redirect('/')
    }
    return {
      path,
      md,
      ...data,
    }
  },
  computed: {
    markdownWithEasyImages () {
      const baseMD = this.md
      let newMD = baseMD
      const urlBase = process.env.urlBase === '/' ? this.path : process.env.urlBase + path.substring(1)
      const imageElementRegex = /<img src=\"(.*).(jpg|jpeg|png|gif|webm|svg)\"/g
      let matches = imageElementRegex.exec(baseMD)
      while (matches != null) {
        newMD = newMD.replace(matches[0], `<img src="${ urlBase }${ matches[1] }.${ matches[2] }"`)
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
