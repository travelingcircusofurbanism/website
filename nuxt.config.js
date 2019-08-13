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
    'nuxt-i18n',
    '@nuxtjs/feed',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-120224641-1',
      },
    ],
    '@nuxtjs/sitemap',
  ],

  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
      },
      {
        code: 'ja',
        iso: 'ja-JP',
        name: '日本語',
      },
    ],
    defaultLocale: 'en',
    baseUrl: 'https://www.travelingcircusofurbanism.com',
    seo: false,
    vuex: {
      syncLocale: true,
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: false,
      fallbackLocale: null,
    },
  },

  sitemap: {
    hostname: `https://www.travelingcircusofurbanism.com`,
    filter({ routes }) {
      return routes.map(route => {
        route.url = `${route.url.replace(/\/$/g, '')}/`
        return route
      })
    },
  },

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
        post =>
          post.preview || (post.public.ja === true || post.public.en === true)
      )

      const locations = require('./nuxt/static/generated/locations.json')
      const tags = require('./nuxt/static/generated/tags.json')
      let categories = []
      posts.forEach(p => {
        // find categories
        if (categories.indexOf(p.category.toLowerCase()) === -1)
          categories.push(p.category.toLowerCase())
      })
      return [
        '404',
        ...cities.map(c => `/${c}`),
        ...cities.map(c => `/ja/${c}`),
        ...posts
          .filter(p => p.public.en || p.preview)
          .map(p => `/${p.city}/${p.slug}`),
        ...posts
          .filter(p => p.public.ja || p.preview)
          .map(p => `/ja/${p.city}/${p.slug}`),
        ...locations.map(l => `/at/${l}`),
        ...locations.map(l => `/ja/at/${l}`),
        ...tags.map(t => `/tag/${t}`),
        ...tags.map(t => `/ja/tag/${t}`),
        ...categories.map(c => `/is/${c}`),
        ...categories.map(c => `/ja/is/${c}`),
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
            post.public.en !== true ||
            post.languages.en !== true ||
            new Date(post.date).getTime() > new Date().getTime()
          )
            return
          const content = fs.readFileSync(
            `./nuxt/static/posts/${post.url}/rssContent.html`,
            'utf-8'
          )
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
