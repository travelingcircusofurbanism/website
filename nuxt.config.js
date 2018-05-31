const fs = require('fs')
const cities = fs.readdirSync('./static/posts')
const posts = require('./static/posts.json')
const locations = Array.from(new Set(
  posts.map(p => p.location)
    .filter(p => p)
))

module.exports = {
  head: {
    titleTemplate: '%s | Traveling Circus of Urbanism',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.css' }
    ],
    script: [
      { src: 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.js' }
    ]
  },
  css: [ './assets/main.scss' ],
  loading: false,
  // markdown module & settings
  modules: [
    '@nuxtjs/markdownit',
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
  },
  generate: {
    dir: 'docs',
    routes: () => [
      ...cities.map(c => `/${c}`),
      ...posts.map(p => `/${p.city}/${p.slug}`),
      ...locations.map(l => `/at/${l}`),
    ]
  }
}
