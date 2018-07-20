<template>
  <section class="content" :class="{ja: displayLanguage === 'ja'}">

    <div 
      class="japanese-available content-top-full" 
      v-if="(userLanguage === 'ja' || isDev) && content.ja && content.en"
    >
      <template v-if="displayLanguage !== 'ja'">
        <img src="~/assets/japanFlag.svg" class="flag-icon" />
        <span>日本語版もあります。</span>
        <span class="button invert" @click="displayLanguage = 'ja'">切り替える</span>
      </template>
      <template v-else>
        <span>日本語版を表示しています。</span>
        <span class="button invert" @click="displayLanguage = 'en'">英語に戻る</span>
      </template>
    </div>

    <!--<div class="top" v-if="!isMobile">
      <nuxt-link to="/" exact class="button secondary onwhite">← Back to Home</nuxt-link>
    </div>-->

    <PostDetails
      class="details"
      :category="category"
      :mapPosition="mapPosition"
      :city="city"
      :date="date"
    />

    <!--<div v-lazy-container="{ selector: 'img'}">-->
      <article class="markdown" v-html="formatMarkdown( content[displayLanguage] || content.en || content.ja )"></article>
    <!--</div>-->

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
  head() { return { 
    title: this.capitalize(this.title),
    meta: [
      { property: 'og:title', content: this.capitalize(this.title) },
      { property: 'og:type', content: 'article' },
      { property: 'og:description', content: this.description, hid: `description` },
      { property: 'og:url', content: `https://www.travelingcircusofurbanism.com${ this.rawPath }` },
      { property: 'og:image', content: `https://www.travelingcircusofurbanism.com${ this.image ? this.image.replace(/\s/g, '%20') : '' }` },
      { property: 'og:site_name', content: 'Traveling Circus of Urbanism' },
    ]
  } },
  components: { Footer, RelatedArticles, PostDetails },

  asyncData ({ route, redirect, env }) {
    const slug = route.path.replace(/\/$/, '')
      .replace('%20', ' ')

    const path = '/posts' + slug + '/'
    const rawPath = '/posts' + slug.replace(' ', '%20') + '/'
    
    let city = route.path.substring(1)
    city = city.substring(0, city.indexOf('/'))
      .replace('%20', ' ')

    let data, en, ja, description, image
    try {
      data = require(`~/static${ path }data.js`)
      const post = require(`~/static/generated/${ city.toLowerCase() }.json`)
        .find(p => slug.indexOf(p.slug) !== -1)
      description = post.description
      image = post.image
    } catch (e) {
      console.log('Error: Unable to find data for ' + path)
      return redirect('/')
    }

    try { en = require(`~/static${ path }content.md`) } catch (e) {}
    try { ja = require(`~/static${ path }ja.md`) } catch (e) {}

    if (!en && !ja) return redirect('/')

    const title = /<h1>(.*)<\/h1>/g.exec(en || ja)[1]

    return {
      path,
      rawPath,
      slug,
      city,
      description,
      content: {
        en,
        ja
      },
      title,
      ...data,
      image,
      mapPosition: data.mapPosition ? Array.concat([], data.mapPosition) : [],
    }
  },

  data () {
    return {
      displayLanguage: 'en'
    }
  },
  computed: {
    isDev () { return this.$store.state.isDev },
    isMobile () { return this.$store.state.isMobile },
    userLanguage () { return this.$store.state.language },
  },
  mounted () {
    this.displayLanguage = this.content.en ? 'en' : 'ja'
    this.$store.commit('setMapMarkers', this.mapPosition)
    this.$store.commit('setCity', this.city)
    this.$store.commit('setHighlight', Array.isArray(this.mapPosition) ? null : this.mapPosition)
    this.$nextTick(() => {
      if (!Array.isArray(this.mapPosition)) return
      // add highlight if multiple
      this.$el.querySelectorAll('a')
        .forEach(e => {
          const elText = e.innerHTML.toLowerCase().replace('&amp;', '&')
          const foundLocation = this.mapPosition.find(p => p.location && elText === p.location.toLowerCase())
          if (foundLocation){
            e.addEventListener('mouseover', () => this.highlight(foundLocation))
            e.addEventListener('mouseout', this.unHighlight)
          }
        })
    })
  },
  beforeDestroy () {
    this.$store.commit('setHighlight')
  },
  methods: {
    capitalize,
    highlight (location) {
      this.$store.commit('setHighlight', location)
    },
    unHighlight () {
      this.$store.commit('setHighlight')
    },
    formatMarkdown (baseMD) {
      let newMD = baseMD
      // fix images
      const imageElementRegex = /<img src=\"(?!http|www\.)\/?(?:(?:[^\/,"]+\/)*)(.+)\.(jpg|jpeg|png|gif|webm|svg)\"/gim
      let matches = imageElementRegex.exec(baseMD)
      while (matches != null) {
        const srcPath = `${ this.path }resized/${ matches[1] }.${ matches[2] }`
        newMD = newMD.replace(matches[0], `<img src="${ srcPath }" data-src="${ srcPath }"`)
        matches = imageElementRegex.exec(baseMD)
      }
      // fix external links
      newMD = newMD.replace(/<a href="(.*)">/g, 
        (match, url) => {
          const target = url.indexOf('travelingcircusofurbanism.com') === -1 ? 'target="_blank"' : ''
          return `<a ${ target } href="${ url }">`
        }
      )
      // fix videos
      newMD = newMD.replace(/(<iframe.*<\/iframe>)/g, 
        (match, iframe) => `<div class="video-wrapper">${iframe}</div>`
      )
      return newMD
    }
  }
}
</script>

<style lang="scss" scoped>

.top {
  margin-bottom: $unit * 8 ;
  margin-top: $unit * 2;
}

.japanese-available {
  background: $active;
  color: white;
  margin-bottom: $content-padding;
  text-align: center;

  @include width(mobile) {
    margin-bottom: $content-padding-mobile;
  }
}

.details {
  @include width (mobile) {
    margin-top: 0;
  }
}

</style>
