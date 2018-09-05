<template>
  <section class="content">
    <template v-if="displayLanguage === 'ja'">
      <h1 class="title">
        <span class="small">このサイトについて</span>
      </h1>
      <p>
        Traveling Circus of Urbanismは、世界中の都市から様々な街づくりの情報を紹介するサイトです。参考になる街づくりのプロジェクトは日本に限らず海外に沢山あるものの、街づくりの情報サイトは、どうしても１つの地域や都市に限定してしまいがち。そこで、都市、街づくり、建築などのトピックを、グローバルに紹介していくことで、街好きのアーバニスト達が世界中の都市で起こっていることをチェックし、お互いに参考にしあうことが出来るはず。Traveling Circus of Urbanismは、そんな想いで活動しています。
      </p>
      <p>
        <strong>Travel(旅)</strong>をすることで、場のエッセンスを発見し、今までと異なる視点で都市を経験することが出来ます。また、世界中の各都市は決して独自のものではなく、 <a href="https://www.unc.edu/courses/2006spring/geog/021/001/massey.pdf">グローバルに関係しあっている</a>こともわかります。
      </p>
      <p>
        <strong>A circus(サーカス)</strong>は、様々な都市を転々と移動しながら、旅によって得た物語や知見を広めて行きます。
      </p>
      <p>
        <strong>Urbanism(アーバニズム)</strong>は、人々の都市における生活様式のことです。
      </p>
      <p>
        Traveling Circus of Urbanismは、都市デザイン、インクルーシブ・デザイン、コミュニティディベロップメント、都市のアートや文化、政治、都市のサステイナビリティについてなど、旅をしながら目に触れた都市に関わるトピックを幅広く紹介していきます。
      </p>
    </template>
    <template v-else>
      <h1 class="title">
        What is the traveling circus of urbanism?
      </h1>
      <p>
        Traveling Circus of Urbanism is a platform for other urban narratives that are collected from the world through traveling.
        This is an exploration of various urban practices with a global perspective, in a way to challenge the focus on localism and ignorance of urbanists for what is happening in the world.
      </p>
      <p>
        <strong>Travel</strong> is a way to unravel the essence of places,
        seeing them from different perspectives and revealing how <a href="https://www.unc.edu/courses/2006spring/geog/021/001/massey.pdf">they are globally connected.</a>
      </p>
      <p>
        <strong>A circus</strong> moves from a city to another, telling stories that are collected from its journey.
      </p>
      <p>
        <strong>Urbanism</strong> is about how people live in cities and interact with our urban environments.
      </p>
      <p>
        It covers a wide range of topics such as urban design, inclusive urbanism, community development, urban art and culture,  politics and urban sustainability and more.
      </p>
    </template>

    <Footer />
  </section>
</template>

<script>
import Footer from '~/components/Footer'
export default {
  head () { 
    return { 
      title: 'About',
      meta: [
        { property: 'og:title', content: 'About Traveling Circus of Urbanism' },
        { property: 'og:url', content: `https://www.travelingcircusofurbanism.com/about/` },
      ]
    }
  },
  components: { Footer, },
  mounted () {
    this.$store.commit('setHighlight')
  },
  computed: {
    displayLanguage () { return this.$store.state.language },
  },
}
</script>

<style scoped lang="scss">
.small{
  font-size: .6em;
}
</style>
