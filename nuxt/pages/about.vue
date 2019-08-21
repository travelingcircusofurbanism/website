<template>
  <section class="content">
    <img src="~assets/about.jpg" alt="About the traveling circus of urbanism" />
    <div v-if="displayLanguage === 'ja'" class="ja">
      <h1 class="title">
        <span class="small">このサイトについて</span>
      </h1>
      <p>
        Traveling Circus of Urbanismは、世界中の都市から様々な街づくりの情報を紹介するサイトです。参考になる街づくりのプロジェクトは日本に限らず海外に沢山あるものの、街づくりの情報サイトは、どうしても１つの地域や都市に限定してしまいがち。そこで、都市、街づくり、建築などのトピックを、グローバルに紹介していくことで、街好きのアーバニスト達が世界中の都市で起こっていることをチェックし、お互いに参考にしあうことが出来るはず。Traveling Circus of Urbanismは、そんな想いで活動しています。
        <br />
        <br />まちづくり、都市デザイン、建築、コミュニティディベロップメント、都市のアートや文化、政治、都市のサステイナビリティについてなど、旅をしながら目に触れた都市に関わるトピックを幅広く紹介していきます。
      </p>

      <SectionHeader>Core Team</SectionHeader>
      <div class="personlist">
        <div class="person">
          <img src="~/assets/staff/marikocolor.jpg" />
          <span>
            <span class="name">杉田真理子 Mariko Sugita</span>
            <span class="title">Founder, Editor in Chief</span>
            <div>
              デンマークオーフス大学で都市社会学専攻、その後ブリュッセル自由大学大学院にて、Urban Studies修士号取得。欧州を中心に、現在まで多くの都市・街づくり関連団体を訪れ、参加型調査やワークショップを重ねてきた経験から、参加型街づくりの仕組みづくりやその情報発信を得意とする。都市に関する取材執筆、調査、翻訳、調査成果物やアーカイブシステムの構築など、編集を軸にした活動を行う。
              <a
                href="http://www.linkedin.com/in/marikosugita"
                target="_blank"
              >LinkedIn</a>,
              <a href="https://twitter.com/marikosugita" target="_blank">Twitter</a>,
              <a href="https://www.instagram.com/mariko_urbannomad/" target="_blank">Instagram</a>,
              <a href="https://www.wantedly.com/users/18183183" target="_blank">Wantedly</a>
            </div>
          </span>
        </div>
        <div class="person">
          <img src="~/assets/staff/jaspercolor.jpg" />
          <span>
            <span class="name">ジャスパー・スティーベンソン Jasper Stephenson</span>
            <span class="title">Designer, Developer</span>
            <div>
              ノースカロライナ州立大学にて、グラフィックデザインを専攻。サンフランシスコやオースティンなどでデザイン関係の職を経験したのち、2015年に拠点を日本に移す。2017年、株式会社Cygamesに入社。プロトタイプや開発に関わる部署にて、UXエンジニアとして働く。2018年から、フリーへ。サンフランシスコのAdobeなどを中心に、UXに関わるプロジェクトに多く携わる。
              <a
                href="https://www.jasperstephenson.com"
                target="_blank"
              >Website</a>
            </div>
          </span>
        </div>
      </div>
    </div>

    <template v-else>
      <h1 class="title">What is the traveling circus of urbanism?</h1>
      <p>
        The Traveling Circus of Urbanism is a platform for other urban
        narratives that are collected from the world through traveling. This is
        an exploration of various urban practices with a global perspective, in
        a way to challenge the focus on localism and ignorance of urbanists for
        what is happening in the world.
      </p>
      <p>
        <strong>Travel</strong> is a way to unravel the essence of places,
        seeing them from different perspectives and revealing how they are globally connected.
      </p>
      <p>
        <strong>A circus</strong> moves from a city to another, telling stories
        that are collected from its journey.
      </p>
      <p>
        <strong>Urbanism</strong> is about how people live in cities and
        interact with our urban environments.
      </p>
      <p>
        It covers a wide range of topics such as urban design, inclusive
        urbanism, community development, urban art and culture, politics and
        urban sustainability and more.
      </p>

      <SectionHeader>Core Team</SectionHeader>
      <div class="personlist">
        <div class="person">
          <img src="~/assets/staff/marikocolor.jpg" />
          <span>
            <span class="name">Mariko Sugita</span>
            <span class="title">Founder, Editor in Chief</span>
            <div>
              Mariko is an urbanist and city lover. Her professional fields are
              research, marketing, and editing and writing in the field of
              architecture and urbanism.
              <a
                href="http://www.linkedin.com/in/marikosugita"
                target="_blank"
              >Full profile</a>
            </div>
          </span>
        </div>
        <div class="person">
          <img src="~/assets/staff/jaspercolor.jpg" />
          <span>
            <span class="name">Jasper Stephenson</span>
            <span class="title">Designer, Developer</span>
            <div>
              Jasper is a traveler and creative polymath. He spends his free
              time learning languages and designing and developing his latest
              passion projects.
              <a
                href="https://www.jasperstephenson.com"
                target="_blank"
              >Website</a>
            </div>
          </span>
        </div>
      </div>
      <p>
        <center>
          Also, thanks to Ramon Bauer and
          <a href="https://www.4cities.eu/" target="_blank">4CITIES</a> for the name inspiration!
        </center>
      </p>
    </template>

    <ContentFooter />
  </section>
</template>

<script>
import ContentFooter from "~/components/Footer";
import SectionHeader from "~/components/SectionHeader";

//TODO vue warning on this page

export default {
  head() {
    return {
      title: "About",
      meta: [
        { property: "og:title", content: "About Traveling Circus of Urbanism" },
        {
          hid: "description",
          name: "description",
          content:
            "This is an exploration of urban practices with a global perspective, to challenge the focus on localism in the world."
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "This is an exploration of urban practices with a global perspective, to challenge the focus on localism in the world."
        },
        {
          property: "og:url",
          content: `https://www.travelingcircusofurbanism.com/about/`
        }
      ]
    };
  },
  components: { ContentFooter, SectionHeader },
  computed: {
    displayLanguage() {
      return this.$i18n.locale;
    }
  },
  created() {
    this.$store.commit("setBreadcrumbs", [
      {
        label: "About",
        url: this.localePath("about")
      }
    ]);
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.commit("setHighlight");
    });
  }
};
</script>

<style scoped lang="scss">
@import "~/assets/variables.scss";

.ja {
  font-size: 0.93em;
  line-height: 1.85;
  letter-spacing: 0.03em;
}

img {
  max-width: 100%;
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

    .name {
      font-weight: 600;
    }
    .title {
      font-weight: 600;
      opacity: 0.3;
      margin-bottom: $unit;
    }
  }
}
</style>
