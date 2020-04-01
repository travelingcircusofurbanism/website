<template>
  <section class="content">
    <div class="content-top-full header"></div>
    <div v-if="displayLanguage === 'ja'" class="ja">
      <h1 class="title">
        <span class="small">Contribute</span>
      </h1>
      <p>
        Traveling Circus of Urbanismでは、世界中の実践者からの寄稿を、随時受け付けています。自身の街の実践について、日英バイリンガルで国内外に発信したい方、取材をしてもらいたい、インタビューして欲しいなど、なんでもお気軽にご相談ください。
        <!-- <a href="~static/assets/Traveling-Circus-of-Urbanism-Contribution-Guideline.pdf" target="_blank">コントリビューションガイド</a>は用意してるので参考にしてください。 -->
        コラボレーションのアイデアもお待ちしています！
      </p>
      <br />
      <a href="mailto:travelingcircusofurbanism@gmail.com" class="nounderline button full">メールを送る</a>
    </div>

    <template v-else>
      <h1 class="title">Contribute</h1>
      <p>
        Traveling Circus of Urbanism is always looking to collaborate with city enthusiasts across the world, to collect stories, knowledge, and insights for a better understanding of cities. If you are an urbanist who's passionate about cities and you're interested in collaborating, please submit your contribution by sending us an
        <a
          href="mailto:travelingcircusofurbanism@gmail.com"
        >email</a>.
      </p>

      <p>We are interested in any stories that deal with the theme of ‘the city’. They could be personal, observational, or documentations of reality. We’re interested in the projects and research you’ve been involved with, the things that represent your life in the city, the things you love or are resentful of in your city, and any other topics that are helpful to get a glimpse of your city.</p>

      <p>
        The contribution guideline is
        <a
          href="/assets/Traveling-Circus-of-Urbanism-Contribution-Guideline.pdf"
          target="_blank"
        >here</a>, and if you have any questions, whether about the writing style, topics, etc, please don’t hesitate to
        <a
          href="mailto:travelingcircusofurbanism@gmail.com"
        >drop us a line</a>! We usually reply within a week.
      </p>

      <p>
        <b>
          Email:
          <a
            href="mailto:travelingcircusofurbanism@gmail.com"
          >travelingcircusofurbanism@gmail.com</a>
        </b>
      </p>
      <p>
        <b>
          Facebook:
          <a
            href="https://www.facebook.com/travelingcircusofurbanism/"
            target="_blank"
          >https://www.facebook.com/travelingcircusofurbanism/</a>
        </b>
      </p>
    </template>
    <ContentFooter />
  </section>
</template>

<script>
import ContentFooter from '~/components/Footer'
export default {
  head() {
    return {
      title: 'Contribute',
      meta: [
        {
          property: 'og:title',
          content: 'Contribute | Traveling Circus of Urbanism',
        },
        {
          property: 'og:url',
          content: `https://www.travelingcircusofurbanism.com/contribute/`,
        },
      ],
    }
  },
  components: { ContentFooter },
  computed: {
    displayLanguage() {
      return this.$i18n.locale
    },
  },
  created() {
    this.$store.commit('setBreadcrumbs', [
      {
        label: 'contribute',
        url: this.localePath('contribute'),
      },
    ])
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.commit('setHighlight')
    })
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/variables.scss';

.header {
  background-image: url('~assets/getinvolved2.jpg');
  background-size: cover;
  background-position: center center;
  height: 30vh;
}

.ja {
  font-size: 0.93em;
  line-height: 1.85;
  letter-spacing: 0.03em;
}

img {
  max-width: 100% !important;
  display: block;
  margin: 0 auto;
}

.button {
  background: white;
  border: 2px solid $active;
  color: $active;
  font-weight: 600;
  max-width: 400px;
  margin: 0 auto;

  &:hover {
    background: $active;
    border: 2px solid transparent;
    color: white;
  }
}
</style>
