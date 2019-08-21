<template>
  <section class="content">
    <main v-if="displayLanguage === 'ja'">
      <h1 class="title">Our Zines</h1>
      <SectionHeader>Vol. 0: Thesis</SectionHeader>
      <BuyButton />
      <img src="/assets/zine/1.jpg" />
      <div class="p ja">Traveling Circus of Urbanismが、zineになりました。</div>
      <div class="p ja">
        旅と越境、移動のなかで、「都市」というよく分からないも
        のへの興味から始まった「Traveling Circus of
        Urbanism(アーバニズムの旅するサー カス)」。2018年から2019年の
        春にかけての1年間で、アメリカ、カナダ、メキシコ、コロンビア、カリブ諸国を転々としながら、7ヶ国約40都市を訪問し、都市やまちづくり、建築に関するプロジェクトや人物を訪ね歩きました。このzineでは、そうして1年かけて集めた物語の一部を紹介しています。
      </div>
      <div class="p">
        <img src="/assets/zine/2.jpg" />
      </div>
      <div class="p ja">
        第１冊目のテーマは「Volume0:
        Thesis」。あえてひとつのテーマに絞らず、「Traveling Circus of
        Urbanism」の活動を紹介するための最初のプロトタイプとして作成しました。紹介されているキーワードは、アーバン・ジャーナリズム、ヒップホップ・アーキテクチャー、主観的地図、建築とエコロジーの融合であるアーコロジーなど。B5版、40ページとコンパクトなボリュームで、日英バイリンガルで作られています。
      </div>
      <div class="p">
        <img src="/assets/zine/4.jpg" />
      </div>
      <div class="p ja">
        ２冊目以降は、今回よりもぐっとボリュームを増やし、冊子のマガジンを定期的に出版することを予定しています。記事を書いてみたいという方、出版協力に興味がある方は、
        <a
          href="mailto:travelingcircusofurbanism@gmail.com"
          target="_blank"
        >こちら</a>からお気軽にご連絡ください。
      </div>
      <div class="p">
        <img src="/assets/zine/5.jpg" />
      </div>
      <div class="p">
        <img src="/assets/zine/3.jpg" />
      </div>
      <BuyButton />
    </main>
    <main v-else>
      <h1 class="title">Our Zines</h1>
      <SectionHeader>Volume 0: Thesis</SectionHeader>
      <BuyButton />
      <img src="/assets/zine/1.jpg" />
      <div class="p">
        It's finally here! Compiled and edited over more than a year of motion
        and learning, this is our thesis statement. Volume 0 journeys across
        Asia and the Americas and back again, uncovering what urbanism has to
        gain from transnational lifestyles and perspectives. If you are an
        urbanist, an architect, or simply love cities and the ways people engage
        with them, this is the zine for you. And at
        <BuyButton :isButton="false">
          <button type="submit">$8, it's too good to miss.</button>
        </BuyButton>
      </div>
      <div class="p">
        <img src="/assets/zine/2.jpg" />
      </div>
      <div class="p">
        The zine features 40 pages of English/Japanese bilingual content with
        all-new stories, photos, and interviews exclusive to the physical
        edition alongside some retouched versions of our favorite web articles
        from the past year. As the first in the series, it's a slightly shorter
        prototype for us to explore new ideas and test storytelling methods and
        printing techniques — hence 'Volume 0'. We hope you like it as much as
        we do!
      </div>
      <div class="p">
        <img src="/assets/zine/4.jpg" />
      </div>
      <div class="p">
        In future volumes of our Traveling Circus of Urbanism zine, we hope to
        curate stories from a global network of writers who have unique points
        of view about their region. If you're interested in pitching a story
        about your city for the next zine, or in being a part of this project,
        <a
          href="mailto:travelingcircusofurbanism@gmail.com"
          target="_blank"
        >drop us a line!</a>
      </div>
      <div class="p">
        <img src="/assets/zine/5.jpg" />
      </div>
      <div class="p">
        <img src="/assets/zine/3.jpg" />
      </div>
      <BuyButton buttonText="Get your copy of Volume 0!" />
    </main>
    <ContentFooter />
  </section>
</template>

<script>
import ContentFooter from '~/components/Footer'
import BuyButton from '~/components/BuyButton'
import SectionHeader from '~/components/SectionHeader'
export default {
  scrollToTop: true,
  head() {
    return {
      title: 'Zine',
      meta: [
        {
          property: 'og:title',
          content: 'Zine | Traveling Circus of Urbanism',
        },
        {
          property: 'og:url',
          content: `https://www.travelingcircusofurbanism.com/zine/`,
        },
        {
          hid: `og:image`,
          property: 'og:image',
          content:
            'https://www.travelingcircusofurbanism.com/assets/zine/hero.jpg',
        },
        {
          property: 'description',
          content: `We've made our first zine! Check it out here.`,
          hid: `description`,
        },
        {
          hid: `og:description`,
          property: 'og:description',
          content: `We've made our first zine! Check it out here.`,
        },
      ],
      // script: [
      //   {
      //     src:
      //       'https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js',
      //   },
      //   {
      //     src: 'https://cdn.snipcart.com/scripts/2.0/snipcart.js',
      //     id: 'snipcart',
      //     'data-api-key':
      //       'OWNjMjAwM2ItMWVkMy00YTA0LTk1MWYtNDAyYmIzN2UyNjA4NjM2OTgxMDA1NjMzMzM3Mzg1',
      //   },
      // ],
      // link: [
      //   {
      //     href: 'https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css',
      //     type: 'text/css',
      //     rel: 'stylesheet',
      //   },
      // ],
    }
  },
  data() {
    return {}
  },
  components: { ContentFooter, BuyButton, SectionHeader },
  computed: {
    displayLanguage() {
      return this.$i18n.locale
      // return 'ja'
    },
  },
  beforeDestroy() {
    this.$store.commit('setCanvasImage')
  },
  created() {
    this.$store.commit('setBreadcrumbs', [
      {
        label: 'Zine',
        url: this.localePath('zine'),
      },
    ])
  },
  mounted() {
    // set canvas to zine picture
    this.$store.commit('setCanvasImage', '/assets/zine/hero.jpg')
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/variables.scss';

.ja{
  font-size: 0.93em;
    line-height: 1.85;
    letter-spacing: 0.03em;
}

h1 {
  width: 100%;
  // text-align: center;
}

img {
  width: 100%;
}

.p {
  margin: $unit * 6 0;
}
</style>
