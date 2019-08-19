<template>
  <section class="content">
    <img src="~assets/about.jpg" alt="About the traveling circus of urbanism" />
    <div v-if="displayLanguage === 'ja'" class="ja">
      <h1 class="title">
        <span class="small">このサイトについて</span>
      </h1>
      <p>
        Traveling Circus of Urbanismは、世界中の都市から様々な街づくりの情報を紹介するサイトです。参考になる街づくりのプロジェクトは日本に限らず海外に沢山あるものの、街づくりの情報サイトは、どうしても１つの地域や都市に限定してしまいがち。そこで、都市、街づくり、建築などのトピックを、グローバルに紹介していくことで、街好きのアーバニスト達が世界中の都市で起こっていることをチェックし、お互いに参考にしあうことが出来るはず。Traveling
        Circus of Urbanismは、そんな想いで活動しています。
      </p>
      <p>
        <strong>Travel(旅)</strong>をすることで、場のエッセンスを発見し、今までと異なる視点で都市を経験することが出来ます。また、世界中の各都市は決して独自のものではなく、グローバルに関係しあっていることもわかります。
      </p>
      <p>
        <strong>A circus(サーカス)</strong>は、様々な都市を転々と移動しながら、旅によって得た物語や知見を広めて行きます。
      </p>
      <p>
        <strong>Urbanism(アーバニズム)</strong>は、人々の都市における生活様式のことです。
      </p>
      <p>
        Traveling Circus of
        Urbanismは、都市デザイン、インクルーシブ・デザイン、コミュニティディベロップメント、都市のアートや文化、政治、都市のサステイナビリティについてなど、旅をしながら目に触れた都市に関わるトピックを幅広く紹介していきます。
      </p>
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
import ContentFooter from '~/components/Footer'
import SectionHeader from '~/components/SectionHeader'

//TODO vue warning on this page

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
