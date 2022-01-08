<template>
  <section class="content">
    <div
      class="intro content-top-full"
      :class="{ explore: exploreOpen }"
    >
      <div class="frame1 invisible">
        <div class="introcontent">
          <template v-if="$i18n.locale === 'en'">
            <h1>
              Urban narratives and practices, collected from
              everywhere.
            </h1>
            <p>
              Learn about the design, function, and
              experience of cities, and share stories from
              yours.
            </p>
            <p class="buttons">
              <span class="button whitehover">Explore</span>
              <span class="button whitehover"
                >Contribute</span
              >
              <span class="button whitehover">About</span>
            </p>
          </template>
          <template v-else>
            <h1 class="ja">
              旅先から集めた、世界の都市の物語。
            </h1>
            <p>
              Traveling Circus of
              Urbanismは、世界中の都市から、都市、街づくり、建築などのトピックを紹介するバイリンガルサイトです。
            </p>
            <p class="sub">
              Traveling Circus of
              Urbanismは、英語が中心のメディアです。日本語にはないコンテンツも沢山あるので、興味がある方は、ぜひ英語版も覗いてみてください。
            </p>
            <p class="buttons">
              <span class="button whitehover"
                >記事を読む</span
              >
              <span class="button whitehover"
                >記事を書く</span
              >
              <span class="button whitehover"
                >このサイトについて</span
              >
            </p>
          </template>
        </div>
      </div>

      <div class="frame1">
        <div class="introcontent">
          <template v-if="$i18n.locale === 'en'">
            <h1>
              Urban narratives and practices, collected from
              everywhere.
            </h1>
            <p>
              Learn about the design, function, and
              experience of cities, and share stories from
              yours.
            </p>
            <p class="buttons">
              <span
                class="button whitehover"
                @click="exploreToggle"
                >Explore</span
              >
              <nuxt-link
                class="button whitehover"
                :to="localePath('contribute')"
                >Contribute</nuxt-link
              >
              <nuxt-link
                class="button whitehover"
                :to="localePath('about')"
                >About</nuxt-link
              >
            </p>
          </template>
          <template v-else>
            <h1 class="ja">
              旅先から集めた、
              <br v-if="!isMobile" />世界の都市の物語。
            </h1>
            <p>
              Traveling Circus of
              Urbanismは、世界中の都市から、都市、街づくり、建築などのトピックを紹介するバイリンガルサイトです。
            </p>
            <p class="sub">
              Traveling Circus of
              Urbanismは、英語が中心のメディアです。日本語にはないコンテンツも沢山あるので、興味がある方は、ぜひ英語版も覗いてみてください。
            </p>
            <p class="buttons">
              <span
                class="button whitehover"
                @click="exploreToggle"
                >記事を読む</span
              >
              <nuxt-link
                class="button whitehover"
                :to="localePath('contribute')"
                >記事を書く</nuxt-link
              >
              <nuxt-link
                class="button whitehover"
                :to="localePath('about')"
                >このサイトについて</nuxt-link
              >
            </p>
          </template>
        </div>
      </div>

      <div class="frame2">
        <div class="explorecontent">
          <img
            class="arrows"
            src="~/assets/introarrows.png"
            v-if="!isMobile"
            :class="{ ja: $i18n.locale === 'ja' }"
          />
          <div>
            <template v-if="$i18n.locale === 'en'">
              <h1>There are three ways to browse!</h1>
              <p class="c1">
                <img
                  class="inlinearrow"
                  v-if="isMobile"
                  src="~/assets/introarrow1.svg"
                />
                <span>{{
                  isMobile
                    ? `Search for a city or category from the menu above`
                    : `Search for a city, place, or category above`
                }}</span>
              </p>
              <p class="c2">
                <img
                  class="inlinearrow"
                  v-if="isMobile"
                  src="~/assets/introarrow2.svg"
                />
                <span>
                  Zoom and pan around the map, then
                  {{ isMobile ? `tap` : `click` }} on
                  <br v-if="!isMobile" />a marker to see
                  articles about that location
                </span>
              </p>
              <p class="c3">
                <img
                  class="inlinearrow"
                  v-if="isMobile"
                  src="~/assets/introarrow3.svg"
                />
                <span
                  >Browse the most recent articles
                  below</span
                >
              </p>
            </template>

            <template v-else>
              <h1 class="ja small">
                記事を探すには、3つの方法があります！
              </h1>
              <p class="c1 ja">
                <img
                  class="inlinearrow"
                  v-if="isMobile"
                  src="~/assets/introarrow1.svg"
                />
                <span>{{
                  isMobile
                    ? `メニューから都市名、土地名、カテゴリーで検索`
                    : `都市名、土地名、カテゴリーで検索`
                }}</span>
              </p>
              <p class="c2 ja">
                <img
                  class="inlinearrow"
                  v-if="isMobile"
                  src="~/assets/introarrow2.svg"
                />
                <span>
                  地図上で気になる場所を探し、
                  <br v-if="!isMobile" />
                  マークを{{
                    isMobile ? `タップ` : `クリック`
                  }}
                </span>
              </p>
              <p class="c3 ja">
                <img
                  class="inlinearrow"
                  v-if="isMobile"
                  src="~/assets/introarrow3.svg"
                />
                <span>下記の最新記事から読む</span>
              </p>
            </template>
          </div>
          <div class="x" @click="exploreToggle">
            <div>+</div>
          </div>
        </div>
      </div>
    </div>
    <PostList
      :posts="showablePosts"
      title="Recent Articles"
      id="posts"
    />
    <ContentFooter />
  </section>
</template>

<script>
import ContentFooter from '~/components/Footer'
import PostList from '~/components/PostList'

export default {
  scrollToTop: true,
  name: 'index',
  layout: 'default',
  head() {
    return {
      title: 'Home',
      meta: [
        {
          property: 'og:title',
          content: 'Traveling Circus of Urbanism',
        },
        {
          property: 'og:url',
          content: `https://www.travelingcircusofurbanism.com/`,
        },
        {
          name: `google-site-verification`,
          content: `-Bj3TQCPSg-RgBnJo1xQc7u3Zm6sHiu70lcvUpurJhU`,
        },
      ],
    }
  },
  components: {
    ContentFooter,
    PostList,
  },
  asyncData({ store }) {
    let posts = store.state.allPosts
    return {
      posts,
    }
  },
  data() {
    return {
      exploreOpen: false,
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile
    },
    isDev() {
      return this.$store.state.viewingAsDev
    },
    userLanguage() {
      return this.$i18n.locale
    },
    showablePosts() {
      return this.posts.filter((p) =>
        this.$store.state.currentShowablePosts.find(
          (c) => c.city === p.city && c.slug === p.slug,
        ),
      )
    },
  },
  created() {
    this.$store.commit('setBreadcrumbs', [])
  },
  mounted() {
    this.$store.commit('setPan', true)
    this.$store.commit('setView', this.showablePosts)
    this.$store.commit('setHighlight')
  },
  methods: {
    exploreToggle() {
      this.exploreOpen = !this.exploreOpen
    },
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/variables.scss';

.intro {
  background-image: url('~assets/introbg.jpg');
  background-size: cover;
  // padding-top: $unit * 8;
  padding-bottom: calc($unit * 6);
  padding-left: 0;
  padding-right: 0;
  width: auto;
  margin-bottom: calc($unit * 5);
  color: white;
  background-color: rgba(0, 0, 0, 0.1);
  background-blend-mode: multiply;
  transition: background-color 0.7s,
    background-position 0.5s;
  background-position: left;
  overflow: hidden;
  position: relative;
  // height: $unit * 55;

  @include width(mobile) {
    // height: $unit * 45;
    background-position: 10% 0%;
    background-color: rgba(0, 0, 0, 0);
  }

  &.explore {
    background-color: rgba(0, 0, 0, 0.8);
    background-position: right;

    .frame1,
    .frame2 {
      transform: translateX(-100%);
    }
    .frame1 {
      opacity: 0;
    }
    .frame2 {
      opacity: 1;
    }
  }

  .frame1,
  .frame2 {
    position: absolute;
    top: calc($unit * 4);
    width: 100%;
    transition: transform 0.5s, opacity 0.5s;
  }
  .frame2 {
    left: 100%;
    opacity: 0;
  }

  .invisible {
    opacity: 0;
    pointer-events: none;
    position: relative !important;
  }

  .introcontent,
  .explorecontent {
    margin-left: auto;
    margin-right: auto;
    max-width: calc($unit * 100 + $content-padding * 2);
    padding: 0 $content-padding;

    @include width(mobile) {
      padding: 0 $content-padding-mobile;
      max-width: calc(
        $unit * 100 + $content-padding-mobile * 2
      );
    }
  }

  .introcontent .sub {
    opacity: 0.9;
    font-weight: 500;
    font-size: 0.85em;
  }

  .explorecontent {
    display: grid;
    grid-template-columns: 56px 1fr 50px;
    gap: calc($unit * 2);

    @include width(mobile) {
      grid-template-columns: 1fr 50px;
      gap: $unit;
    }

    img.arrows {
      margin-top: calc($unit * 0.5);
      width: 100%;

      &.ja {
        margin-top: calc($unit * -1);
        width: 43px;
      }
    }

    img.inlinearrow {
      height: 1.7em;
      position: relative;
      top: 0.3em;
    }

    p {
      @include width(mobile) {
        display: grid;
        grid-template-columns: 1.3em 1fr;
        gap: 1em;
      }
    }

    .x {
      width: 50px;
      height: 50px;
      margin-top: calc($unit * 2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 4rem;
      color: white;
      transition: background 0.3s;
      cursor: pointer;

      div {
        transform: rotate(45deg);
      }

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }

  h1 {
    color: $text;
    font-size: 50px;
    line-height: 1.1;
    margin: calc($unit * 3) 0;
    font-weight: 700;
    color: white;
    max-width: calc($unit * 90);

    &.ja {
      font-size: 40px;
    }

    &.small {
      font-size: 30px;
    }

    @include width(mobile) {
      font-size: 2rem;
      margin: calc($unit * 2.5) 0 calc($unit * 3) 0;
    }
  }

  p {
    margin: calc($unit * 3.7) 0;
    max-width: calc($unit * 80);
    font-weight: 600;

    &.ja {
      margin: calc($unit * 2) 0;
    }

    @include width(mobile) {
      margin: calc($unit * 2) 0;
    }
  }

  .buttons {
    display: flex;
    // justify-content: center;
    margin-top: calc($unit * 4);

    .button {
      font-weight: 600;
      color: white;
      text-decoration: none;
      // margin-left: calc($unit * 2);
      margin-right: calc($unit * 4);
      white-space: nowrap;

      @include width(mobile) {
        margin-right: calc($unit * 2);
      }

      &:nth-child(1) {
        background: $c1;
      }
      &:nth-child(2) {
        background: $c2;
      }
      &:nth-child(3) {
        background: $c3;
      }
    }
  }
}
</style>
