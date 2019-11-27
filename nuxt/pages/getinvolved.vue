<template>
  <section class="content">
    <img src="~assets/getinvolved2.jpg" alt="Get involved!" />
    <div v-if="displayLanguage === 'ja'" class="ja">
      <h1 class="title">
        <span class="small">Get Involved!</span>
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
      <h1 class="title">Get Involved!</h1>
      <p>
        Do you want to tell stories about your city as part of Traveling Circus
        of Urbanism?
      </p>
      <p>Do you want us to come and visit your city?</p>
      <p>
        Are you interested in cross-cultural collaboration and sharing ideas
        with different cities in the world?
      </p>
      <p>
        Traveling Circus of Urbanism is always looking to collaborate with city
        enthusiasts across the world. If you are an urbanist who's passionate
        about cities and you're interested in collaborating or contributing, check out our
        <a
          href="/assets/Traveling-Circus-of-Urbanism-Contribution-Guideline.pdf"
          target="_blank"
        >contribution guide</a>, and don’t hesitate to drop us a line!
      </p>
      <br />
      <a
        href="mailto:travelingcircusofurbanism@gmail.com"
        class="nounderline button full"
      >Get in touch!</a>
    </template>
    <ContentFooter />
  </section>
</template>

<script>
import ContentFooter from '~/components/Footer'
export default {
  head() {
    return {
      title: 'Get Involved',
      meta: [
        {
          property: 'og:title',
          content: 'Get Involved | Traveling Circus of Urbanism',
        },
        {
          property: 'og:url',
          content: `https://www.travelingcircusofurbanism.com/getinvolved/`,
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
        label: 'Get Involved',
        url: this.localePath('getinvolved'),
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
