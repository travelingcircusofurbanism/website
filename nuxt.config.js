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
      { hid: 'og:description', property: 'og:description', content: 'Urban narratives and practices, collected through travel' },
      { hid: `og:type`, property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Traveling Circus of Urbanism' },
      { hid: `og:image`, property: 'og:image', content: `https://www.travelingcircusofurbanism.com/assets/sitethumbnail.jpg` },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: []
  },

  css: [ './assets/main.scss' ],

  loading: false,

  modules: [
    '~/modules/postprep',
    '@nuxtjs/feed',
    ['@nuxtjs/google-analytics', {
      id: 'UA-120224641-1'
    }]
  ],

  plugins: ['~/plugins/plugins'],

  build: {
    watch: ['static/posts', 'components', 'pages', 'layouts', 'plugins', 'modules', 'nuxt.config.js'],
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
    fallback: "404.html",
    routes: () => [
      ...cities.map(c => `/${c}`),
      ...posts.map(p => `/${p.city}/${p.slug}`),
      ...locations.map(l => `/at/${l}`),
      ...categories.map(c => `/is/${c}`),
    ]
  },

  feed: [
    {
      path: '/feed.xml', // The route to your feed.
      async create(feed) {
        feed.options = {
          title: 'Traveling Circus of Urbanism',
          link: 'https://www.travelingcircusofurbanism.com/feed.xml',
          description: 'Urban narratives and practices, collected through travel.',
          image: "https://www.travelingcircusofurbanism.com/assets/sitethumbnail.jpg",
          favicon: "https://www.travelingcircusofurbanism.com/favicon.ico",
          author: {
            name: 'Mariko Sugita',
            email: 'travelingcircusofurbanism@gmail.com',
            link: 'https://www.travelingcircusofurbanism.com/author'
          }
        }

        posts.forEach(post => {
          if (!post.public) return
          const content = fs.readFileSync(`./static/posts/${ post.url }/generated/html/rssContent.html`)
          feed.addItem({
            title: post.title,
            id: post.url,
            link: `https://www.travelingcircusofurbanism.com${ post.url }`,
            description: content,
            date: new Date(post.date),
            image: `https://www.travelingcircusofurbanism.com${ post.image }`
          })
        })

        feed.addCategory('Urbanism')
        feed.addCategory('Cities')
        feed.addCategory('Design')
        feed.addCategory('Travel')

        feed.addContributor({
          name: 'Mariko Sugita',
          email: 'travelingcircusofurbanism@gmail.com',
          link: 'https://www.travelingcircusofurbanism.com'
        })
      },
      cacheTime: 1000 * 60, // How long should the feed be cached, in ms
      type: 'rss2' // Can be: rss2, atom1, json1
    }
  ],

}
