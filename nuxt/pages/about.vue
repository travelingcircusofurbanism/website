<template>
  <section class="content">
    <div class="header content-top-full"></div>
    <div v-if="displayLanguage === 'ja'" class="ja">
      <h1 class="title">
        <span class="small">このサイトについて</span>
      </h1>
      <p>
        Traveling Circus of
        Urbanismは、世界中の都市から様々な街づくりの情報を紹介するサイトです。参考になる街づくりのプロジェクトは日本に限らず海外に沢山あるものの、街づくりの情報サイトは、どうしても１つの地域や都市に限定してしまいがち。そこで、都市、街づくり、建築などのトピックを、グローバルに紹介していくことで、街好きのアーバニスト達が世界中の都市で起こっていることをチェックし、お互いに参考にしあうことが出来るはず。Traveling
        Circus of Urbanismは、そんな想いで活動しています。
      </p>
      <p>
        まちづくり、都市デザイン、建築、コミュニティディベロップメント、都市のアートや文化、政治、都市のサステイナビリティについてなど、旅をしながら目に触れた都市に関わるトピックを幅広く紹介していきます。
      </p>

      <SectionHeader>Core Team</SectionHeader>
      <div class="personlist">
        <div class="person">
          <img src="~/assets/staff/marikocolor.jpg" />
          <div>
            <span class="name"
              >杉田真理子 Mariko Sugita</span
            >
            <span class="title"
              >Founder, Editor in Chief</span
            >
            <div>
              デンマークオーフス大学で都市社会学専攻、その後ブリュッセル自由大学大学院にて、Urban
              Studies修士号取得。欧州を中心に、現在まで多くの都市・街づくり関連団体を訪れ、参加型調査やワークショップを重ねてきた経験から、参加型街づくりの仕組みづくりやその情報発信を得意とする。都市に関する取材執筆、調査、翻訳、調査成果物やアーカイブシステムの構築など、編集を軸にした活動を行う。
              <a
                href="http://www.linkedin.com/in/marikosugita"
                target="_blank"
                >LinkedIn</a
              >,
              <a
                href="https://twitter.com/marikosugita"
                target="_blank"
                >Twitter</a
              >,
              <a
                href="https://www.instagram.com/mariko_urbannomad/"
                target="_blank"
                >Instagram</a
              >,
              <a
                href="https://www.wantedly.com/users/18183183"
                target="_blank"
                >Wantedly</a
              >
            </div>
          </div>
        </div>
        <div class="person">
          <img src="~/assets/staff/jaspercolor.jpg" />
          <div>
            <span class="name"
              >ジャスパー・スティーベンソン Jasper
              Stephenson</span
            >
            <span class="title">Designer, Developer</span>
            <div>
              ノースカロライナ州立大学にて、グラフィックデザインを専攻。サンフランシスコやオースティンなどでデザイン関係の職を経験したのち、2015年に拠点を日本に移す。2017年、株式会社Cygamesに入社。プロトタイプや開発に関わる部署にて、UXエンジニアとして働く。2018年から、フリーへ。サンフランシスコのAdobeなどを中心に、UXに関わるプロジェクトに多く携わる。
              <a
                href="https://www.jasperstephenson.com"
                target="_blank"
                >Website</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <template v-else>
      <h1 class="title">
        What is Traveling Circus of Urbanism?
      </h1>
      <p>
        Traveling Circus of Urbanism is a platform for urban
        narratives that are collected from the world through
        traveling and dialogues with the citizens of the
        world.
      </p>

      <p>
        As an urbanist and city enthusiast, I’ve visited
        cities around the world. The more places I went, the
        more it became clear: I needed a way to share and
        archive my overwhelming collection of experiences
        and urban realities — after all, communicating the
        knowledge gained through research is as important as
        the knowledge itself.
      </p>

      <p>
        During the graduation ceremony of my trans-Europe
        master program, a professor jokingly described our
        cohort as “a traveling circus of urbanism” because
        of our peculiar brand of roaming urban study. That
        phrase stuck in my head, and a few years later,
        Traveling Circus of Urbanism was born. Travel, both
        physically and mentally, is a way to unravel the
        essence of places, seeing them from different
        perspectives and revealing how they are globally
        connected. A circus moves from a city to another,
        telling stories that are collected from its journey.
        Urbanism is about how people live in cities and
        interact with our urban environments.
      </p>

      <p>
        It started humbly as a website, a platform to
        collect urban narratives through my journalistic
        travel across the cities in the world. Soon, fellow
        urbanists from all over the world began offering
        contributions to share incredible stories about
        their cities. We’ve grown from there, from magazines
        to even an “urbanist in residency” program called
        <a href="https://www.brdg.to/" target="_blank"
          >Bridge To</a
        >.
      </p>

      <p>
        Traveling Circus of Urbanism puts forward a simple
        but contentious concept — namely, the need for more
        global perspectives in investigations of cities, and
        for urban storytelling to side with the
        underrepresented.
      </p>

      <p>
        I hope Traveling Circus of Urbanism can help to
        bring the urbanists of the world together, beyond
        professions, disciplines, and nationalities. If you
        have a story from your city, you can
        <nuxt-link to="/contribute">contribute it</nuxt-link
        >!
      </p>

      <p>
        <i>–Mariko Sugita</i>
      </p>

      <SectionHeader>Core Team</SectionHeader>
      <div class="personlist">
        <div class="person">
          <img src="~/assets/staff/marikocolor.jpg" />
          <div>
            <span class="name">Mariko Sugita</span>
            <span class="job"
              >Founder, Editor in Chief</span
            >
            <div>
              Mariko is an urbanist and city lover. Her
              professional fields are research, marketing,
              and editing and writing in the field of
              architecture and urbanism.
              <a
                href="http://www.linkedin.com/in/marikosugita"
                target="_blank"
                >Full profile</a
              >
            </div>
          </div>
        </div>
        <div class="person">
          <img src="~/assets/staff/jaspercolor.jpg" />
          <div>
            <span class="name">Jasper Stephenson</span>
            <span class="job">Designer, Developer</span>
            <div>
              Jasper is a traveler and creative polymath. He
              spends his free time learning languages and
              designing and developing his latest passion
              projects.
              <a
                href="https://www.jasperstephenson.com"
                target="_blank"
                >Website</a
              >
            </div>
          </div>
        </div>
      </div>
      <br />
      <center>
        Also, thanks to Ramon Bauer and
        <a href="https://www.4cities.eu/" target="_blank"
          >4CITIES</a
        >
        for the name inspiration!
      </center>
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
import ContentFooter from '~/components/Footer'
import SectionHeader from '~/components/SectionHeader'

export default {
  head() {
    return {
      title: 'About',
      meta: [
        {
          property: 'og:title',
          content: 'About Traveling Circus of Urbanism',
        },
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
  gap: $unit * 4;

  @include width(mobile) {
    grid-template-columns: 1fr;
    text-align: center;
  }

  & > img {
    width: $img-height;
    height: $img-height;
    border-radius: calc($img-height / 2);
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

.kofi {
  display: block;
  margin-top: 2em;
  border: 1px solid #ddd;
  width: 100%;
  padding: 4px;
  background: #f9f9f9;
}
</style>
