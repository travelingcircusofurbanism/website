<template>
  <section class="content">
    <template v-if="displayLanguage === 'ja'">
      <h1 class="title">TCUジン Vol. 0: Thesis</h1>
      <h3>Vol. 0: Thesis</h3>
      <BuyButton />

      <BuyButton />
    </template>
    <template v-else>
      <h1 class="title">TCU Zine</h1>
      <h3>Vol. 0: Thesis</h3>
      <BuyButton />
      <img src />
      <p>
        <b>Text about the magazine</b> text about the magazine text about the magazine. Text about the magazine text about the magazine, text.
      </p>
      <img src />
      <img src />
      <p>
        Text about the magazine text about the magazine. Text about the magazine text about the magazine, text.
        Text about the magazine text about the magazine. Text about the magazine text about the magazine, text.
        Text about the magazine text about the magazine. Text about the magazine text about the magazine, text.
        Text about the magazine text about the magazine. Text about the magazine text about the magazine, text.
        Text about the magazine text about the magazine. Text about the magazine text about the magazine, text.
        Text about the magazine text about the magazine. Text about the magazine text about the magazine, text.
      </p>
      <img src />
      <img src />
      <p>
        Text about the magazine text about the magazine. Text about the magazine text about the magazine, text.
        Text about the magazine text about the magazine. Text about the magazine text about the magazine, text.
        Text about the magazine text about the magazine. Text about the magazine text about the magazine, text.
        Text about the magazine text about the magazine. Text about the magazine text about the magazine, text.
        Text about the magazine text about the magazine. Text about the magazine text about the magazine, text.
        Text about the magazine text about the magazine. Text about the magazine text about the magazine, text.
      </p>
      <BuyButton />
    </template>
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
    this.$store.commit('setCanvasImage', '/assets/sitethumbnail.jpg')
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/variables.scss';

img {
  width: 100%;
}
</style>
