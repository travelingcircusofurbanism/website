<template>
  <section class="content">
    <div>
      {{ 
        new Date(date)
          .toLocaleDateString('en-US', 
            { year: 'numeric', month: 'long', day: 'numeric' })
      }}
      <span> ・ </span>
      <span>
        Tags: {{
          tags
            .map(t => t.substring(0,1).toUpperCase() + t.substring(1))
            .join(', ') 
          }}
      </span>
    </div>
    <article class="markdown" v-html="markdownWithEasyImages"></article>
    <Footer/>
  </section>
</template>

<script>
import Footer from '~/components/Footer'

export default {
  components: { Footer, },
  asyncData ({ route, redirect, env }) {
    const path = '/posts' + route.path
      .replace(/\/$/g, '') + '/'
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
