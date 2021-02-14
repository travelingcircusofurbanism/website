<template>
  <section class="content">
    <div class="header content-top-full"></div>
    <div v-if="displayLanguage === 'ja'" class="ja">
      <h1 class="title">
        <span class="small">仕事依頼</span>
      </h1>
      <p>
       Traveling Circus of Urbanismは、都市・建築・まちづくりの分野に特化した「アーバン・ジャーナリズム」を軸に活動する旅する編集レーベルです。テキストに留まらず、写真（フォトジャーナリズム）、映像（ビデオジャーナリズム、ビデオエスノグラフィー）、音声などさまざまなデジタルツールを用い、メディアや編集の分野から、「都市」に関わる実践や業界を面白くすることが活動ミッションです。
       </p>
 <p>
都市から都市へ軽やかに移動しながら、噂話を伝え、行く先々で何かしらの面白い活動の種をまくような、サーカスのような存在のようになれたら。そして、私たちが伝えたいものが「この事例面白いね」で終わるのでなく、「自分たちでも何かやってみよう」という建設的な議論やアクションに繋がるように、「ストーリーテリング」の力を用いて実際のアクションも伴った活動を展開しています。
</p>
      <SectionHeader>リサーチ活動</SectionHeader>
 <p>
インタビューやフィールド調査などを通して世界の都市のトレンドやエリア分析などを行います。

      <ul>
         <li>まちづくりに関するリサーチプロジェクト：インタビュー調査、インサイト抽出（電通デジタル）</li>
         <li>Webリニューアルプロジェクト：訪日外国人インタビュー調査、インサイト抽出（株式会社ロフトワーク、京都市観光協会）</li>
         <li>地図文化醸成・サービス向上のためのリサーチプロジェクト、プロジェクトディレクション（株式会社Stroly）</li>
         <li>フードロスを中心とした都市システムと食の関係性を探るリサーチ（Cascoland）</li>
      </ul>
</p>
      <SectionHeader>キュレーション</SectionHeader>
 <p>
世界中の建築家・まちづくり実践者とのコネクションを活かし、展覧会などでのキュレーションを行います。

<ul>
  <li>メキシコと日本をつなぐオンライン展「<a href="https://www.overworld.mx/">Overworld</a>」キュレーション （国際交流基金メキシコ日本文化センター）<a href="https://www.jpf.go.jp/j/about/press/2020/dl/2020-012.pdf">link</a></li>
  <li>「都市」をテーマにした、建築・街づくり・アートなど都市に関わる実践者のための「アーバニスト・イン・レジデンス」＆キュレーション プラットフォーム「<a href="https://www.brdg.to/">Bridge To</a>」運営・展示企画 
  </li>
</ul>
</p>

      <SectionHeader>編集・執筆・出版活動</SectionHeader>
 <p>
      <ul>
         <li>日本の建築・まちづくりに関する調査・執筆・編集（World Architecture Community）</li>
         <li>インタビュー・コピーライティング（京都精華大学）</li>
          <li>公報コミュニケーションツール、ZINE、小冊子などの編集・出版</li>
          <li>出版レーベル「Traveling Circus of Urbanism」の運営</li>
          <li>Webメディア、印刷媒体での執筆（Mezzanine, Unleash, Houzz, YADOKARI, AMP など）</li>
      </ul>
</p>

      <SectionHeader>ファシリテーション</SectionHeader>
 <p>
      <ul>
         <li>「主観的地図」づくりのワークショップ（国際交流基金メキシコ日本文化センター・モンテレイ工科大学建築学部）</li>
          <li>良い地図の条件、地図づくりの仕組みを考える2日間のデザインスプリント（株式会社Stroly）</li>
          <li>Global Goals Jam（アムステルダム工科大学）</li>
      </ul>
</p>

<!-- 
<SectionHeader>プロジェクトマネジメント</SectionHeader>
 <p>
都市から都市へ軽やかに移動しながら、噂話を伝え、行く先々で何かしらの面白い活動の種をまくような、サーカスのような存在のようになれたら。そして、私たちが紹介する事例が、「この事例面白いね」で終わるのでなく、「自分たちでも何かやってみよう」という建設的な議論やアクションに繋がるように、実際のアクションも伴った活動を展開しています。
</p> -->


    </div>

    <template v-else>
      <h1 class="title">Work</h1>
      <p>Traveling Circus of Urbanism is a multidisciplinary, borderless publishing label and curatorial platform of urban journalism. We put forward a simple but contentious concept, namely, the need for more global perspectives in investigations of cities, and urban storytelling to side with the underrepresented.</p>


      <SectionHeader>Curatorial Research</SectionHeader>

      <p>

        WE've collaborated with various clients in the field of architecture and urbanism, conducting trend research and area analysis, mediums, and helping them to verbalize their concepts. 
      <ul>
         <li>Interview and trend research about the needs of large scale wooden builingds (DENSTU digital)
         </li>
         <li>Interview research with tourists in the creative industry, concept development and copy writing for the web renewal (Loftcork.Inc / Kyoto Tourism Association)</li>
         <li>Design research on map culture and needs in Japan (Stroly.Inc)）</li>
         <li>Curatorial research and development of online Exhibition: <a href="https://www.overworld.mx/">Overworld</a>（Fundación Japón en México）</li>
         <li>Curation and project manegement of <a href="https://www.brdg.to/">Bridge to Kyoto</a>, a residence for urbanists as well as an event, workshop, and gallery space. </li>
      </ul>

      </p>

      <SectionHeader>Editing and Publishing</SectionHeader>

      <p>
<ul>
  
  <li>
    Traveling Circus of Urbanism： a platform for urban narratives that are collected from the world through traveling and dialogues with the citizens of the world.
  </li>
    <li>
    Editorial direction and concept development of ZINE and small publications
  </li>
</ul>

      </p>

      <SectionHeader>Writing and Translation</SectionHeader>

      <p>
      <ul>
         <li>Country Reporter of Japan（World Architecture Community）</li>
         <li>Interviews and copy writings</li>
      </ul>

      </p>

      <SectionHeader>Facilitation</SectionHeader>

      <p>
      <ul>
         <li>Subjective Mapping Workshop（Universidad de Monterrey）</li>
          <li>Design Sprint（Stroly.Inc）</li>
          <li>Global Goals Jam Tokyo（Digital Society School）</li>
      </ul>
      </p>

<!-- 
      <SectionHeader>Project Management</SectionHeader>

      <p></p>
 -->
      <br />

    </template>

    <ContentFooter />
  </section>
</template>

<script>
import ContentFooter from '~/components/Footer'
import SectionHeader from '~/components/SectionHeader'

export default {
  head() {
    return {
      title: 'About',
      meta: [
        { property: 'og:title', content: 'About Traveling Circus of Urbanism' },
        {
          hid: 'description',
          name: 'description',
          content:
            'This is an exploration of urban practices with a global perspective, to challenge the focus on localism in the world.',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'This is an exploration of urban practices with a global perspective, to challenge the focus on localism in the world.',
        },
        {
          property: 'og:url',
          content: `https://www.travelingcircusofurbanism.com/about/`,
        },
      ],
    }
  },
  components: { ContentFooter, SectionHeader },
  computed: {
    displayLanguage() {
      return this.$i18n.locale
    },
  },
  created() {
    this.$store.commit('setBreadcrumbs', [
      {
        label: 'About',
        url: this.localePath('about'),
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
  background-image: url('~assets/about.jpg');
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

.small {
  font-size: 0.6em;
}
// .personlist {
//   // display: flex;
//   // flex-wrap: wrap;
//   // justify-content: center;
// }
.person {
  $img-height: $unit * 18;
  display: inline-block;
  margin: 0 0 $unit * 8 0;
  display: grid;
  grid-template-columns: $img-height 1fr;
  grid-gap: $unit * 4;

  @include width(mobile) {
    grid-template-columns: 1fr;
    text-align: center;
  }

  & > img {
    width: $img-height;
    height: $img-height;
    border-radius: $img-height / 2;
    @include width(mobile) {
      margin: 0 auto;
    }
  }

  & > span {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
.name {
  font-weight: 700;
}
.job {
  font-weight: 500;
  opacity: 0.3;
  margin-bottom: $unit;
}
</style>
