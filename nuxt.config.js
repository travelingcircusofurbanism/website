const fs = require('fs')

module.exports = {
  srcDir: 'nuxt/',

  head: {
    titleTemplate(titleChunk) {
      return (
        (titleChunk ? titleChunk + ' | ' : '') + `Traveling Circus of Urbanism`
      )
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'Urbanism, Architecture, Urban Studies, Urban Design, Travel, 都市, 建築, アーバニズム, まちづくり, 都市デザイン',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Urban narratives and practices, collected through travel',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Urban narratives and practices, collected through travel',
      },
      { hid: `og:type`, property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Traveling Circus of Urbanism' },
      {
        hid: `og:image`,
        property: 'og:image',
        content: `https://www.travelingcircusofurbanism.com/assets/sitethumbnail.jpg`,
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [],
  },

  css: ['./assets/main.scss'],

  loading: false,

  modules: [
    '~/modules/postprep',
    '@nuxtjs/feed',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-120224641-1',
      },
    ],
  ],

  plugins: ['~/plugins/plugins'],

  build: {
    watch: [
      'posts',
      'nuxt/components',
      'nuxt/pages',
      'nuxt/layouts',
      'nuxt/plugins',
      'nuxt/modules',
      'nuxt.config.js',
    ],
    styleResources: {
      scss: 'assets/variables.scss',
    },
    extend(config) {
      if (!config.module.noParse) config.module.noParse = []
      else if (!Array.isArray(config.module.noParse))
        config.module.noParse = [config.module.noParse]
      config.module.noParse.push(/(mapbox-gl)\.js$/)
    },
  },

  generate: {
    dir: './docs',
    routes: () => {
      const cities = fs
        .readdirSync('./nuxt/static/posts')
        .filter(c => c.indexOf('.') !== 0)
      const posts = require('./nuxt/static/generated/posts.json').filter(
        post => post.public || post.preview
      )
      const jaPosts = posts.filter(post => post.languages.ja === true)
      const enPosts = posts.filter(post => post.languages.en === true)
      const locations = require('./nuxt/static/generated/locations.json')
      const tags = require('./nuxt/static/generated/tags.json')
      let categories = []
      posts.map(p => {
        // find categories
        if (categories.indexOf(p.category.toLowerCase()) === -1)
          categories.push(p.category.toLowerCase())
      })
      return [
        '404',
        ...cities.map(c => `/${c}`),
        ...enPosts.map(p => `/${p.city}/${p.slug}`),
        ...jaPosts.map(p => `/${p.city}/ja/${p.slug}`),
        ...locations.map(l => `/at/${l}`),
        ...tags.map(t => `/tag/${t}`),
        ...categories.map(c => `/is/${c}`),
      ]
    },
  },

  feed: [
    {
      path: '/feed.xml', // The route to your feed.
      async create(feed) {
        feed.options = {
          title: 'Traveling Circus of Urbanism',
          link: 'https://www.travelingcircusofurbanism.com/feed.xml',
          description:
            'Urban narratives and practices, collected through travel.',
          image:
            'https://www.travelingcircusofurbanism.com/assets/sitethumbnail.jpg',
          favicon: 'https://www.travelingcircusofurbanism.com/favicon.ico',
          author: {
            name: 'Mariko Sugita',
            email: 'travelingcircusofurbanism@gmail.com',
            link: 'https://www.travelingcircusofurbanism.com/author',
          },
        }

        const posts = require('./nuxt/static/generated/posts.json')
        posts.forEach(post => {
          if (
            !post.public ||
            post.languages.en !== true ||
            new Date(post.date).getTime() > new Date().getTime()
          )
            return
          const content = fs.readFileSync(
            `./nuxt/static/posts/${post.url}/rssContent.html`,
            'utf-8'
          )
          console.log(content)
          feed.addItem({
            title: post.title,
            id: encodeURI(post.url),
            link: encodeURI(
              `https://www.travelingcircusofurbanism.com${post.url}`
            ),
            description: content,
            date: new Date(post.date),
            image: encodeURI(
              `https://www.travelingcircusofurbanism.com${post.image}`
            ),
          })
        })

        feed.addCategory('Urbanism')
        feed.addCategory('Cities')
        feed.addCategory('Design')
        feed.addCategory('Travel')

        feed.addContributor({
          name: 'Mariko Sugita',
          email: 'travelingcircusofurbanism@gmail.com',
          link: 'https://www.travelingcircusofurbanism.com',
        })
      },
      cacheTime: 1000 * 60, // How long should the feed be cached, in ms
      type: 'rss2', // Can be: rss2, atom1, json1
    },
  ],
}
