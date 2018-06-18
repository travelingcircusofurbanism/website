const fs = require('fs')

const cities = fs.readdirSync('./static/posts')
  .filter(c => c.indexOf('.') !== 0)
const posts = require('./static/generated/posts.json')
let locations = [],
    categories = []
posts.map(p => {
  // find categories
  if (categories.indexOf(p.category.toLowerCase()) === -1)
    categories.push(p.category.toLowerCase())
  // find locations
  if (Array.isArray(p.mapPosition))
    p.mapPosition
      .map(pos => pos.location)
      .filter(l => l)
      .forEach(loc => {
        if (locations.indexOf(loc.toLowerCase()) === -1)
          locations.push(loc.toLowerCase())
      })
  if (p.mapPosition && p.mapPosition.location && locations.indexOf(p.mapPosition.location.toLowerCase()) === -1)
    locations.push(p.mapPosition.location.toLowerCase())
})

module.exports = {
  mode: 'spa',
  head: {
    titleTemplate (titleChunk) {
      return (titleChunk ? titleChunk + ' | ' : '') + `Traveling Circus of Urbanism`
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Collecting urban narratives and practices through traveling from city to city' }
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
    typographer: true
  },
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
