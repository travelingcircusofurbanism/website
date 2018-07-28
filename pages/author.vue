<template>
  <section class="content">
    <template v-if="displayLanguage === 'ja'">
      <h1 class="title">
        <span class="small">サイト運営者</span>
      </h1>
      <img src="~/assets/ProfilePicture.jpg">
      <p>
        杉田真理子：ブリュッセル自由大学大学院にて、Urban Studies修士号取得。株式会社ロフトワーク都市空間マネジメント部マーケティングを経験後、2018年5月から北米へ移動、フリーへ。ブリュッセル、ウィーン、コペンハーゲン、マドリードの4拠点を移動しながら、エリアブランディング、都市人口学、まちづくりの計画理論などを学ぶ。欧州を中心に、現在まで海外で計50都市、120団体以上を訪れ、参加型調査やワークショップを重ねてきた経験から、参加型街づくりの仕組みづくりやその情報発信を得意とする。
      </p>
      <p>
        <strong>
          アーバニスト、都市愛好家として。
        </strong>
        合計して、今まで7ヶ国10都市以上に住んだことのある多拠点居住支持者で、都市デザイン、建築、街づくりに関する海外のプロジェクトに多数参加し、世界中の都市を訪れながらフリーで仕事をしています。東京で開催した地図づくりワークショップ<a href="https://medium.com/@mariko9012/subjective-map-workshop-shibuya-712e92d21051" target="_blank">subjective map workshop</a>や、日本のアーバニストコミュニティを生み出すことを目指した<a href="https://medium.com/@mariko9012/urbanist-meetup-tokyo-examining-the-role-of-urbanists-in-improving-urban-life-in-tokyo-df2e5bdea51a" target="_blank">urbanist meetup</a>など、都市に関わる様々なプロジェクトを手がけています。
      </p>

      <p>
        <strong>
          プロジェクトマネージャーとして。
        </strong>
        Loftworkという会社で、都市空間マネジメントに関わるプロジェクトのディレクションとマーケティングを担当しました。２日間のグローバルデザインワークショップである<a href="https://medium.com/digitalsocietyschool/global-goals-jam-2017-tokyo-6141f938b7d3" target="_blank">Global Goals Jam</a>の東京チャプターのオーガナイザーや、UNDP日本事務局と連携して<a href="https://loftwork.com/jp/event/20170829_sgs_report" target="_blank">ソーシャル・グット・サミット</a>の2017年東京チャプターの開催など、ワークショップやイベントのコーディネート経験もあります。
      </p>

      <p>
        <strong>
          ライター、翻訳家として。
        </strong>
          都市デザイン、アーバニズム、建築の分野で、6年以上のライター、翻訳経験があります。フリーランスとして、過去に多数の都市でリサーチ活動・インタビューを行ってきました。
      </p>
      <p>
        取材、翻訳、調査、編集欧米でのツアーなど、いつでもお声かけください。気軽な情報交換やコラボレーションなども大歓迎です！
      </p>
      <p>
        連絡先：mariko9012@gmail.com<br>
        詳細プロフィール：<a href="https://www.linkedin.com/in/mariko-sugita-28327bb6/" target="_blank">LinkedIn</a>
      </p>

      <p class="sub">
        <i>サイト構築・運営協力：<a href="http://www.jasperstephenson.com" target="_blank">Jasper Stephenson</a></i>
      </p>
    </template>
    <template v-else>
      <h1 class="title">
        About the author
      </h1>
      <img src="~/assets/ProfilePicture.jpg">
      <p>
        Hi! I'm Mariko, a city enthusiast currently traveling around the world.
        I'm a researcher, editor and writer on the urban issues, and I have been involved in the various international urban programs and initiatives all over the world.
      </p>

      <p>
        <strong>
          As an Urbanist,
        </strong>
        I'm most passionate about our cities. I’ve involved in many international educational projects like <a href="http://www.4cities.eu/" target="_blank">4CITIES</a>, <a href="https://www.urbandivercities.eu/" target="_blank">DIVERCITIES</a>, and have visited more than 120 organizations and 50 cities accross the globe for research. More specifically I’m interested in ethno-cultural diversity in our cities, and the notion of nationality and sense of belonging.
      </p>

      <p>
        <strong>
          As a project manager,
        </strong>
        Having worked in a design firm <a href="https://loftwork.com/en/" target="_blank">Loftwork</a> as a director and marketer, I organize various events and workshops in collaboration with the international organizations, such as 2 days workshop <a href="https://medium.com/digitalsocietyschool/global-goals-jam-2017-tokyo-6141f938b7d3" target="_blank">Global Goals Jam</a> and <a href="https://loftwork.com/jp/event/20170829_sgs_report" target="_blank">Social Good Summit Tokyo</a>, or more urbanism related events like <a href="https://medium.com/@mariko9012/subjective-map-workshop-shibuya-712e92d21051" target="_blank">subjective map workshop</a> and <a href="https://medium.com/@mariko9012/urbanist-meetup-tokyo-examining-the-role-of-urbanists-in-improving-urban-life-in-tokyo-df2e5bdea51a" target="_blank">urbanist meetup</a>.
      </p>

      <p>
        <strong>
          As a writer / translator,
        </strong>
          I work across the spectrum of urban design, urbanism and architecture. For the past 6 years, I’ve conducted various in depth field research/interviews across the world and have written the analytical articles and papers as a freelance writer.
      </p>

      <p>
        <strong>
          Personally,
        </strong>
        I'm a huge traveler – I’ve lived in ten different cities, in seven different countries. I’m always passionate about making my homes everywhere in the world!
      </p>
      <p>
        If you're interested in working together, or just to have a cup of coffee to know what I’m up to, please <a href="mailto:mariko9012@gmail.com">email me</a> or check out my <a href="https://www.linkedin.com/in/mariko-sugita-28327bb6/" target="_blank">LinkedIn page</a>!
      </p>

      <p class="sub">
        <i>Special thanks to <a href="http://www.jasperstephenson.com" target="_blank">Jasper Stephenson</a> for mentorship and coding help on this site!</i>
      </p>
    </template>
    <Footer />
  </section>
</template>

<script>
import Footer from '~/components/Footer'
export default {
  head() { return { title: 'Author' } },
  components: { Footer, },
  computed: {
    displayLanguage () { return this.$store.state.language },
  },
  mounted () {
    this.$store.commit('setPan', true)
    this.$store.commit(
      'setMapMarkers',
      [
        {
          bearing: 0,
          center: [139.69170639999993, 35.6894875],
          zoom: 1,
          pitch: 0,
          location: 'Tokyo'
        },
        {
          bearing: 0,
          center: [16.37381890000006, 48.2081743],
          zoom: 1,
          pitch: 0,
          location: 'Vienna'
        },
        {
          bearing: 0,
          center: [4.351710300000036, 50.8503396],
          zoom: 1,
          pitch: 0,
          location: 'Brussels'
        },
        {
          bearing: 0,
          center: [-3.7037901999999576, 40.4167754],
          zoom: 1,
          pitch: 0,
          location: 'Madrid'
        },
        {
          bearing: 0,
          center: [12.568337199999974, 55.6760968],
          zoom: 1,
          pitch: 0,
          location: 'Copenhagen'
        },
        {
          bearing: 0,
          center: [10.203921000000037, 56.162939],
          zoom: 1,
          pitch: 0,
          location: 'Aarhus'
        },
        {
          bearing: 0,
          center: [-95.71289100000001, 37.09024],
          zoom: 1,
          pitch: 0,
          location: 'US cities'
        },
        {
          bearing: 0,
          center: [120.9842195, 14.5995124],
          zoom: 1,
          pitch: 0,
          location: 'Manila'
        }
      ]
    )
  }
}
</script>

<style scoped lang="scss">
img{
  width:100%;
}
.small{
  font-size: .6em;
}

</style>
