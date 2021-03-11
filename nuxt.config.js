const fs = require('fs')
require('dotenv').config()

// "deploysite": "git subtree push --prefix docs origin gh-pages",
//  "golive": "git pull && npm run pushlocalchanges && npm run generate && npm run deploysite && npm run cleanup",
//  "pushlocalchanges": "npm run cleanup && git add . && git diff-index --quiet HEAD || git commit -m \"Auto-pushing files\" && git push"

module.exports = {
  telemetry: false,
  target: 'static',
  srcDir: 'nuxt/',
  loading: false,
  css: ['./assets/main.scss'],

  head: {
    titleTemplate(titleChunk) {
      return (
        (titleChunk ? titleChunk + ' | ' : '') +
        `Traveling Circus of Urbanism`
      )
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: `og:type`,
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:site_name',
        content: 'Traveling Circus of Urbanism',
      },
      {
        hid: `og:image`,
        property: 'og:image',
        content: `https://www.travelingcircusofurbanism.com/assets/sitethumbnail.jpg`,
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  },

  modules: [
    '~/modules/postprep-hook',
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
  },

  sitemap: {
    hostname: `https://www.travelingcircusofurbanism.com`,
    filter({ routes }) {
      return routes.map((route) => {
        route.url = `${route.url.replace(/\/$/g, '')}/`
        return route
      })
    },
  },

  plugins: ['~/plugins/plugins'],

  build: {
    // analyze: true,

    watch: [
      'posts',
      'nuxt/components',
      'nuxt/pages',
      'nuxt/layouts',
      'nuxt/plugins',
      'nuxt/modules',
      'nuxt.config.js',
    ],

    extend(config) {
      if (!config.module.noParse) config.module.noParse = []
      else if (!Array.isArray(config.module.noParse))
        config.module.noParse = [config.module.noParse]
      config.module.noParse.push(/(mapbox-gl)\.js$/)
    },

    optimization: {
      splitChunks: {
        name: true,
      },
    },
  },

  generate: {
    dir: './docs',
    fallback: '404.html',

    routes: async () => {
      const posts = require('./nuxt/static/generated/posts.json').filter(
        (post) => post.preview,
      )

      return [
        // '404',
        ...posts
          .filter((p) => p.languages.en)
          .map((p) => `/${p.city}/${p.slug}`),
        ...posts
          .filter((p) => p.languages.ja)
          .map((p) => `/ja/${p.city}/${p.slug}`),
      ]
    },
  },

  feed: [
    {
      path: '/feed.xml', // The route to the English feed.
      async create(feed) {
        feed.options = {
          title: 'Traveling Circus of Urbanism',
          link:
            'https://www.travelingcircusofurbanism.com/feed.xml',
          description:
            'Urban narratives and practices, collected through travel.',
          image:
            'https://www.travelingcircusofurbanism.com/assets/sitethumbnail.jpg',
          favicon:
            'https://www.travelingcircusofurbanism.com/favicon.ico',
          author: {
            name: 'Mariko Sugita',
            email: 'travelingcircusofurbanism@gmail.com',
            link:
              'https://www.travelingcircusofurbanism.com/about',
          },
        }

        const posts = require('./nuxt/static/generated/posts.json')
        posts.forEach((post) => {
          if (
            post.public.en !== true ||
            new Date(post.date).getTime() >
              new Date().getTime()
          )
            return
          const content = fs.readFileSync(
            `./nuxt/static/posts/${post.url}/enRssContent.html`,
            'utf-8',
          )
          feed.addItem({
            title: post.title.en,
            id: encodeURI(post.url),
            link: encodeURI(
              `https://www.travelingcircusofurbanism.com${post.url}`,
            ),
            description: content,
            date: new Date(post.date),
            image: encodeURI(
              `https://www.travelingcircusofurbanism.com${post.image}`,
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
      type: 'rss2',
    },
    {
      path: '/jafeed.xml', // The route to the Japanese feed
      async create(feed) {
        feed.options = {
          title: 'アーバニズムの旅するサーカス',
          link:
            'https://www.travelingcircusofurbanism.com/jafeed.xml',
          description: '旅先から集めた、世界の都市の物語。',
          image:
            'https://www.travelingcircusofurbanism.com/assets/sitethumbnail.jpg',
          favicon:
            'https://www.travelingcircusofurbanism.com/favicon.ico',
          author: {
            name: '杉田真理子',
            email: 'travelingcircusofurbanism@gmail.com',
            link:
              'https://www.travelingcircusofurbanism.com/ja/about',
          },
        }

        const posts = require('./nuxt/static/generated/posts.json')
        posts.forEach((post) => {
          if (
            post.public.ja !== true ||
            new Date(post.date).getTime() >
              new Date().getTime()
          )
            return
          const content = fs.readFileSync(
            `./nuxt/static/posts/${post.url}/jaRssContent.html`,
            'utf-8',
          )
          feed.addItem({
            title: post.title.ja,
            id: encodeURI(post.url),
            link: encodeURI(
              `https://www.travelingcircusofurbanism.com/ja${post.url}`,
            ),
            description: content,
            date: new Date(post.date),
            image: encodeURI(
              `https://www.travelingcircusofurbanism.com${post.image}`,
            ),
          })
        })

        feed.addCategory('Urbanism')
        feed.addCategory('Cities')
        feed.addCategory('Design')
        feed.addCategory('Travel')
        feed.addCategory('アーバニズム')
        feed.addCategory('都市デザイン')
        feed.addCategory('都市')
        feed.addCategory('まちづくり')
        feed.addCategory('建築')
        feed.addCategory('旅行')
        feed.addCategory('旅')

        feed.addContributor({
          name: '杉田真理子',
          email: 'travelingcircusofurbanism@gmail.com',
          link:
            'https://www.travelingcircusofurbanism.com/ja/',
        })
      },
      cacheTime: 1000 * 60, // How long should the feed be cached, in ms
      type: 'rss2',
    },
  ],
}
