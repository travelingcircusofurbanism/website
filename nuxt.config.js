const fs = require('fs')

const cities = fs.readdirSync('./static/posts')
  .filter(c => c.indexOf('.') !== 0)
const posts = require('./static/generated/posts.json')
const locations = require('./static/generated/locations.json')
let categories = []
posts.map(p => {
  // find categories
  if (categories.indexOf(p.category.toLowerCase()) === -1)
    categories.push(p.category.toLowerCase())
})

module.exports = {
  head: {
    titleTemplate (titleChunk) {
      return (titleChunk ? titleChunk + ' | ' : '') + `Traveling Circus of Urbanism`
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Urban narratives and practices, collected through travel' },
      { property: 'og:title', content: 'Traveling Circus of Urbanism' },
      { property: 'og:type', content: 'website' },
      { property: 'og:description', content: 'Urban narratives and practices, collected through travel', hid: `description` },
      { property: 'og:url', content: `https://www.travelingcircusofurbanism.com` },
      { property: 'og:image', content: `https://www.travelingcircusofurbanism.com/images/sitethumbnail.jpg` },
      { property: 'og:site_name', content: 'Traveling Circus of Urbanism' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: []
  },
  css: [ './assets/main.scss' ],
  loading: false,
  // markdown module & settings
  modules: [
    '@nuxtjs/markdownit',
    ['@nuxtjs/google-analytics', {
      id: 'UA-120224641-1'
    }]
  ],
  markdownit: {
    html: true,
    linkify: true,
    breaks: true,
    typographer: true,
    injected: true
  },
  plugins: ['~/plugins/plugins'],
  build: {
    styleResources: {
      scss: './assets/variables.scss',
    },
    extend (config) {
      if (!Array.isArray(config.module.noParse))
        config.module.noParse = [config.module.noParse]
      config.module.noParse.push(/(mapbox-gl)\.js$/)
    }
  },
  generate: {
    dir: 'docs',
    routes: () => [
      ...cities.map(c => `/${c}`),
      ...posts.map(p => `/${p.city}/${p.slug}`),
      ...locations.map(l => `/at/${l}`),
      ...categories.map(c => `/is/${c}`),
    ]
  }
}
