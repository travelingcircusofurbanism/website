<template>
  <section class="content">
    <main v-if="displayLanguage === 'ja'">
      <h1 class="title">Bridge To Kyoto</h1>
      <img src="/assets/bridgeto/bridgeto9.jpg" />
      <div class="p ja">京都をベースに、「アーバニスト・イン・レジデンス」プログラムのための場づくりを開始します。</div>
      <div
        class="p ja"
      >旅と越境、移動のなかで、「都市」というテーマを考えるWebメディア、「Traveling Circus of Urbanism（アーバニズムの旅するサーカス）」を2018年6月にスタートさせてから、1年以上が経ちました。さまざまな土地に足を運び、建築・街づくり・不動産など都市に関わる多くの実践者と出会い、対話をし、共に街を歩き、食卓を囲み、将来のプロジェクトのアイデアを語り合うなかで、こうしたざらざらとしたリアルな場所感覚や土臭さを、もっと多くの人と共有出来ればと思いました。「台北のこの建築家、東京の○○さんに紹介したら面白いかも。」「サンフランシスコのこの実践、京都の文脈でしても面白いかも。」そんなアイデアはいつもあります。けれど全てを行動にうつすことは難しく、そして海外事例が無批判に消費されやすい日本で、Webメディアで事例を紹介することの限界も感じていました。行き着いた答えは、具体的な場をつくる、ということです。</div>
      <div class="p ja">
        <a href="https://www.brdg.to/ja" target="_blank">Bridge to Kyoto</a>
        は「都市」をテーマにした、建築・街づくり・不動産など都市に関わる実践者のための「アーバニスト・イン・レジデンス」です。オンラインのプラットフォームであるWebメディア「Traveling Circus of Urbanism(アーバニズムの旅するサーカス)」と、京都の古い物件を自分達の手で改修したオフラインのスペースを上手く交差させながら、世界中からアーバニストを受け入れ、国内の建築・街づくりの実践者と交流し、コラボレーションが生まれるきっかけをつくりたいと思っています。
      </div>

      <div
        class="p ja"
      >地域の活性化を目的としたアーティスト・イン・レジデンスが注目を集める一方で、より地域の課題解決や長期的なコラボレーションを目的としたアーバニスト・イン・レジデンスの可能性が、近年注目を集め始めています。海外の街づくりの事例をそのままコピーアンドペーストすることは出来なくとも、お互いから学ぶことはできるはず。グローバルな目線で、ローカルに活動することで、国境を超えた建築・街づくりプロジェクトが生まれる可能性を追求したいと思っています。</div>

      <div class="p ja">
        今回特にこだわったのは、1年前から実践しているゼロ・ウェイスト。
        電力は100%自然エネルギーを使用し、可能な限り手作りやリサイクル用品にこだわったり、プラスチックや使い捨てのゴミを出さないように務めるなど、施設全体でサステイナブルな住まいを実践するようにしています。ゼロ・ウェイストをテーマにしたワークショップなども定期的に開催予定です。
      </div>
      <div class="p ja">
        Bridge to Kyoto海外からの実践者受け入れを中心としつつも、「都市」をテーマにした小規模のイベントやワークショップなどのアイデアを常に受け付けています。興味がある方は、
        <a
          href="mailto:travelingcircusofurbanism@gmail.com"
          target="_blank"
        >こちら</a>からお気軽にご連絡ください。
      </div>
      <div class="p">
        <img src="/assets/bridgeto/bridgeto6.jpg" />
      </div>
      <div class="p">
        <img src="/assets/bridgeto/bridgeto8.jpg" />
      </div>
      <div class="p">
        <img src="/assets/bridgeto/bridgeto7.jpg" />
      </div>
      <BuyButton />
    </main>

    <main v-else>
      <h1 class="title">Bridge To Kyoto</h1>
      <img src="/assets/bridgeto/bridgeto9.jpg" />

      <div
        class="p"
      >A year has already passed since we launched the Traveling Circus of Urbanism! During our journey, we've met so many inspiring practitioners from around the world who have been generous enough to share their passion, knowledge, and ambition with us. It's encouraging to see how many like-minded urbanists across the globe are working towards a better city life, but some questions have arisen.</div>

      <div
        class="p"
      >How can we go beyond national interests and narrow-minded localism on urban practices? How can we develop cultural diplomacy of urban affairs and create an international sense of cities? How can we find &amp; develop effective tools and models that can be documented, shared, and applied even in different parts of the world?</div>

      <div class="p">
        This is why we opened
        <a href="https://www.brdg.to" target="_blank">Bridge to Kyoto</a>, a creative residency for urbanists to live, work and share their practices in Japan.
      </div>

      <div
        class="p"
      >Bridge to Kyoto is a residence for urbanists as well as an event, workshop, and gallery space. Anyone who considers themselves part of the phenomenon of “the city" is welcome to stay with us and/or use our space.</div>

      <div
        class="p"
      >We rented an old Japanese-style house in Kyoto, Japan. It's small but full of charm, and we are renovating the building by ourselves. It's the first of many urbanist in residence home-bases which we plan to open in different parts of the world. Our next target is Tokyo sometime in 2021, and we're looking forward to opening Bridge to Taipei, Bridge to Mexico City, Bridge to Lisbon, and so on in the future to build a global network for urbanists.</div>

      <div
        class="p"
      >We can’t just copy and paste the best practices from other parts of the world to our city, but that doesn’t mean that we can't learn from each other. We believe that more urbanists coming from different backgrounds &amp; sharing their work helps change the discourse and practice of urbanism across the globe. By inviting urbanists from around the world, we’d like to encourage local-scale international collaboration within a global frame of mind.</div>

      <div class="p">
        You can find more details
        <a href="https://www.brdg.to/" target="_blank">here!</a>
      </div>

      <div class="p">
        <img src="/assets/bridgeto/bridgeto6.jpg" />
      </div>
      <div class="p">
        <img src="/assets/bridgeto/bridgeto8.jpg" />
      </div>
      <div class="p">
        <img src="/assets/bridgeto/bridgeto7.jpg" />
      </div>
    </main>
    <ContentFooter />
  </section>
</template>

<script>
import ContentFooter from '~/components/Footer'
import SectionHeader from '~/components/SectionHeader'
export default {
  scrollToTop: true,
  layout: 'default',
  head() {
    return {
      title: 'Zine',
      meta: [
        {
          property: 'og:title',
          content: 'Bridge To Kyoto | Traveling Circus of Urbanism',
        },
        {
          property: 'og:url',
          content: `https://www.travelingcircusofurbanism.com/bridgeto/`,
        },
        {
          hid: `og:image`,
          property: 'og:image',
          content:
            'https://www.travelingcircusofurbanism.com/assets/bridgeto/bridgeto9.jpg',
        },
        {
          property: 'description',
          content: `We've started an urbanist-in-residence program! Check it out here.`,
          hid: `description`,
        },
        {
          hid: `og:description`,
          property: 'og:description',
          content: `We've started an urbanist-in-residence program! Check it out here.`,
        },
      ],
    }
  },
  data() {
    return {}
  },
  components: { ContentFooter, SectionHeader },
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
        label: 'Bridge To Kyoto',
        url: this.localePath('bridgeto'),
      },
    ])
  },
  mounted() {
    this.$store.commit('setCanvasImage', '/assets/bridgeto/house.svg')
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/variables.scss';

.ja {
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
