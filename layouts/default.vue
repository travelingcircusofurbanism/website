<template>
  <div class="master" ref="master" :class="{mobile: isMobile}">
    <Header />
    <Canvas />
    <nuxt />
  </div>
</template>

<script>
  import Canvas from '~/components/Canvas'
  import Header from '~/components/Header'

  export default {
    components: { Canvas, Header },
    computed: {
      isMobile () { return this.$store.state.isMobile },
    },
    mounted() {
      this.$store.commit('setLanguage', window.navigator.userLanguage || window.navigator.language)
      this.$store.commit('setDev', window.location.hostname.indexOf('localhost') === -1 )
      window.addEventListener('resize', this.checkWidth)
      this.checkWidth()
      this.$root._router.afterEach(this.resetScroll)
    },
    methods: {
      checkWidth () {
        this.$store.commit('setMobile', window.innerWidth)
      },
      resetScroll () {
        document.querySelector('body').scrollTo(0, 0)
      }
    }
  }

</script>

<style lang="scss">

  .master {
    display: flex;
    overflow: hidden;
    width: 100vw;
    height: 100vh;

    & > * {
      flex: 1;
      max-width: 50%;
      overflow: hidden;
      overflow-y: auto;
      height: 100vh;
    }

    @include width (mobile) {
      display: block;
      height: auto;

      & > * {
        max-width: 100%;
        overflow-y: visible;
        height: auto;
      }
    }
  }

</style>
