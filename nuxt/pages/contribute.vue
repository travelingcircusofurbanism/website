<template>
  <section class="content">
    <div class="content-top-full header"></div>
    <div v-if="displayLanguage === 'ja'" class="ja">
      <h1 class="title">
        <span class="small">Contribute</span>
      </h1>
      <p>
        Traveling Circus of
        Urbanismでは、世界中の実践者からの寄稿を、随時受け付けています。自身の街の実践について、日英バイリンガルで国内外に発信したい方、取材をしてもらいたい、インタビューして欲しいなど、なんでもお気軽にご連絡ください。コラボレーションのアイデアもお待ちしています。メールは<a
          href="mailto:travelingcircusofurbanism@gmail.com"
          >こちら</a
        >まで。
      </p>

      <h3>
        エッセイを寄稿する
      </h3>
      <p>
        都市・建築・まちづくりに関するさまざまな記事の寄稿を受け付けています。学術的な内容でも、主観を織り交ぜたエッセイでも、あなたの街のおすすめスポットの紹介など、形式は問いません。英語・日本語どちらの言語でも受け付けています。コントリビューションガイドは<a
          href="~static/assets/Traveling-Circus-of-Urbanism-Contribution-Guideline.pdf"
          target="_blank"
          >こちら（英語）</a
        >。
      </p>

      <h3>
        リンクを投稿する
      </h3>
      <p>
        Traveling Circus of
        Urbanismでは、都市に関する世界中のプロジェクトやニュースが地図上で閲覧できるようになっています。記事を書くのは難しいければど、地図上でプロジェクトの紹介をしたいという場合は、HPのリンクを<a
          href="mailto:travelingcircusofurbanism@gmail.com"
          >メール</a
        >にてご送付ください。HPへ移行するロケーションピンをTraveling
        Circus of Urbanismの地図上に追加します。
      </p>

      <EmailCapture />

      <a
        href="mailto:travelingcircusofurbanism@gmail.com"
        class="nounderline button full"
        >メールを送る</a
      >
    </div>

    <template v-else>
      <h1 class="title">Contribute</h1>
      <p>
        Traveling Circus of Urbanism is always looking to
        collaborate with city enthusiasts across the world,
        to collect stories, knowledge, and insights for a
        better understanding of cities. If you are an
        urbanist who's passionate about cities and you're
        interested in collaborating, please send us an
        <a href="mailto:travelingcircusofurbanism@gmail.com"
          >email</a
        >.
      </p>

      <h3>
        Send us your essays
      </h3>
      <p>
        We are interested in any stories that deal with the
        theme of ‘the city’. They could be personal,
        observational, or documentations of reality. We’re
        interested in the projects and research you’ve been
        involved with, the things that represent your life
        in the city, the things you love or are resentful of
        in your city, and any other topics that are helpful
        to get a glimpse of your city. If you want to
        promote an article that has been already published
        somewhere, simply send us a link.
      </p>

      <p>
        The contribution guideline is
        <a
          href="/assets/Traveling-Circus-of-Urbanism-Contribution-Guideline.pdf"
          target="_blank"
          >here</a
        >, and if you have any questions, whether about the
        writing style, topics, etc, please don’t hesitate to
        <a href="mailto:travelingcircusofurbanism@gmail.com"
          >drop us a line</a
        >! We usually reply within a week.
      </p>

      <h3>
        Send us links to your projects
      </h3>

      <p>
        Traveling Circus of Urbanism provides a world map of
        stories, initiatives, and happeningd around the
        theme of urbanism. If you want your project to be
        included in the map but don't have the time to write
        a whole article, please
        <a href="mailto:travelingcircusofurbanism@gmail.com"
          >email us a link</a
        >
        to your website explaining the project. We'll create
        a location pin on the map that goes to your website.
      </p>

      <EmailCapture />

      <p>
        <b>
          Email:
          <a
            href="mailto:travelingcircusofurbanism@gmail.com"
            >travelingcircusofurbanism@gmail.com</a
          >
        </b>
      </p>
      <p>
        <b>
          Facebook:
          <a
            href="https://www.facebook.com/travelingcircusofurbanism/"
            target="_blank"
            >https://www.facebook.com/travelingcircusofurbanism/</a
          >
        </b>
      </p>
    </template>

    <iframe
      class="kofi"
      src="https://ko-fi.com/travelingcircusofurbanism/?hidefeed=true&widget=true&embed=true&preview=true"
      height="712"
      title="travelingcircusofurbanism"
    ></iframe>

    <ContentFooter />
  </section>
</template>

<script>
import EmailCapture from '~/components/EmailCapture'
import ContentFooter from '~/components/Footer'
export default {
  head() {
    return {
      title: 'Contribute',
      meta: [
        {
          property: 'og:title',
          content:
            'Contribute | Traveling Circus of Urbanism',
        },
        {
          property: 'og:url',
          content: `https://www.travelingcircusofurbanism.com/contribute/`,
        },
      ],
    }
  },
  components: { ContentFooter, EmailCapture },
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
.kofi {
  margin-top: 2em;
  border: 1px solid #ddd;
  width: 100%;
  padding: 4px;
  background: #f9f9f9;
}
</style>
