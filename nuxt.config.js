const posts = require('./static/posts.json')
module.exports = {
  head: {
    title: 'Traveling Circus of Urbanism',
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
  build: {},
  generate: {
    dir: 'docs',
    routes: () => [
      ...posts.map(p => `/${p.slug}`)
    ]
  }
}
