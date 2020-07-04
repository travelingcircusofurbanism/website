<template>
  <section class="content">
    <main v-if="displayLanguage === 'ja'" class="ja">
      <h1 class="title">
        <span class="small">ご注文ありがとうございました！</span>
      </h1>
      <div class="p">
        ディベロッパー・Aaron
        Stephensonの名義で、注文確認メールを送付しました。発送まで、少々お時間を頂戴することがございます。ご了承ください。
      </div>
    </main>
    <main v-else>
      <h1 class="title">Thank you!</h1>
      <div class="p">
        Thanks for buying our zine! It means a lot to us to see that people are
        interested in reading something we spent a lot of time making and
        editing.
      </div>
      <div class="p">
        Just a heads up: the confirmation email you receive will say that you've
        paid to Aaron Stephenson. That's me, the developer of Traveling Circus,
        and all the money goes into more traveling and more zines. We send all
        of these personally from Kyoto, Japan, so it may take a few weeks to
        arrive at your door. Thanks for being patient, and we hope you'll
        continue to support TCU in the future. Cheers!
      </div>
    </main>
    <ContentFooter />
  </section>
</template>

<script>
import ContentFooter from "~/components/Footer";
export default {
  layout: 'default',
  head() {
    return {
      title: "Zine Confirmation",
      meta: [
        {
          property: "og:title",
          content: "Zine Cinformation | Traveling Circus of Urbanism"
        },
        {
          property: "og:url",
          content: `https://www.travelingcircusofurbanism.com/zine/confirmation`
        },
        {
          hid: `og:image`,
          property: "og:image",
          content:
            'https://www.travelingcircusofurbanism.com/assets/zine/hero.jpg',
        },
        {
          name: 'robots',
          content: 'noindex',
        },
      ],
    }
  },
  data() {
    return {};
  },
  components: { ContentFooter },
  computed: {
    displayLanguage() {
      return this.$i18n.locale;
      // return 'ja'
    }
  },
  beforeDestroy() {
    this.$store.commit("setCanvasImage");
  },
  created() {
    this.$store.commit("setBreadcrumbs", [
      {
        label: "Zine: Thanks!",
        url: this.localePath("zine-thanks")
      }
    ]);
  },
  mounted() {
    // set canvas to zine picture
    this.$store.commit("setCanvasImage", "/assets/zine/hero.jpg");
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

h1 {
  width: 100%;
  text-align: center;
}

.small {
  font-size: 0.6em;
}

.p {
  margin: $unit * 6 0;
}
</style>
