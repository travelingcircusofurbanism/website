<template>
  <section class="content">
    <main v-if="displayLanguage === 'ja'">
      <h1 class="title">TCUジン Vol. 0: Thesis</h1>
      <h3>Vol. 0: Thesis</h3>
      <BuyButton />

      <BuyButton />
    </main>
    <main v-else>
      <h1 class="title">Our Zines</h1>
      <h3 class="sectionhead">Volume 0: Thesis</h3>
      <BuyButton />
      <img src="/assets/zine/1.jpg" />
      <div class="p">
        It's finally here! Compiled and edited over more than a year of motion and learning, this is our thesis statement. Volume 0 journeys across Asia and the Americas and back again, uncovering what urbanism has to gain from transnational lifestyles and perspectives. If you are an urbanist, an architect, or simply love cities and the ways people engage with them, this is the zine for you. And at
        <BuyButton :isButton="false">$7, it's too good to miss.</BuyButton>
      </div>
      <div class="p">
        <img src="/assets/zine/2.jpg" />
      </div>
      <div
        class="p"
      >The zine features 40 pages of English/Japanese bilingual content with all-new stories, photos, and interviews exclusive to the physical edition alongside some retouched versions of our favorite web articles from the past year. As the first in the series, it's a slightly shorter prototype for us to explore new ideas and test storytelling methods and printing techniques — hence 'Volume 0'. We hope you like it as much as we do!</div>
      <div class="p">
        <img src="/assets/zine/4.jpg" />
      </div>
      <div class="p">
        In future volumes of our Traveling Circus of Urbanism zine, we hope to curate stories from a global network of writers who have unique points of view about their region. If you're interested in piching a story about your city for the next zine, or in being a part of this project,
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
export default {
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
      ],
      script: [
        {
          src:
            'https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js',
        },
        {
          src: 'https://cdn.snipcart.com/scripts/2.0/snipcart.js',
          id: 'snipcart',
          'data-api-key':
            'OWNjMjAwM2ItMWVkMy00YTA0LTk1MWYtNDAyYmIzN2UyNjA4NjM2OTgxMDA1NjMzMzM3Mzg1',
        },
      ],
      link: [
        {
          href: 'https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css',
          type: 'text/css',
          rel: 'stylesheet',
        },
      ],
    }
  },
  data() {
    return {}
  },
  components: { ContentFooter, BuyButton },
  computed: {
    displayLanguage() {
      return this.$store.state.language
    },
  },
  beforeDestroy() {
    this.$store.commit('setCanvasImage')
  },
  mounted() {
    // set canvas to zine picture
    this.$store.commit('setCanvasImage', '/assets/zine/hero.jpg')
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/variables.scss';

h1 {
  width: 100%;
  text-align: center;
}

h3,
.sectionhead {
  margin-top: $unit * 6;
  margin-bottom: $unit * 5;
  color: $text;

  &:before,
  &:after {
    background: $text;
  }
}

img {
  width: 100%;
}

.p {
  margin: $unit * 6 0;
}
</style>
