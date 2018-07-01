<template>
  <div id="header" :class="{hide: scrollDirection === 'down'}">
    <nuxt-link exact to="/" class="logo">
      <h1>Traveling Circus of Urbanism</h1>
      <h3 class="tagline">Urban narratives and practices, collected through traveling</h3>
    </nuxt-link>
    <div class="sublinks">
      <nuxt-link to="/about">About</nuxt-link>
      <nuxt-link to="/author">Author</nuxt-link>
    </div>
    <div>
      <div class="citylabel" :class="{active: currentCity}">
        Current City: <span>{{ capitalize(currentCity) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Selector from '~/components/Selector'
import { capitalize } from '~/assets/commonFunctions'

export default {
  components: {
    Selector,
  },
  data () {
    return {
      prevScrollTop: 0,
      scrollDirection: 'up',
    }
  },
  computed: {
    currentCity () { return this.$store.state.currentCity },
    isMobile () { return this.$store.state.isMobile },
  },
  mounted () {},
  methods: {
    capitalize
  }
}

</script>

<style scoped lang="scss">

  a, a:hover, a:visited, a:active {
    display: inline-block;
    color: white;
    text-decoration: none;
    transition: .2s;
    pointer-events: auto;
  }

  #header {
    position: fixed;
    display: inline-block;
    top: $header-offset;
    // left: $header-offset;
    z-index: 10;
    height: 100vh;
    pointer-events: none;
    max-width: 45%;

    @include width (mobile) {
      display: block;
      width: 100%;
      height: auto;
      max-width: 100%;
      position: relative;
      top: 0;
      left: 0;
      overflow: hidden;
      transition: all .4s;

      &.hide {
        bottom: 100%;
      }
    }
  }

  .logo {
    display: inline-block;
    padding: $unit * 4 $unit * 5 $unit * 3 $content-padding;
    font-weight: 600;
    background: $active;
    box-shadow: 0 10px 20px rgba(#444, .7);

    @include width (mobile) {
      text-align: center;
      box-shadow: none;
      width: 100%;
      padding: $unit * 3 $unit;

      .tagline {
        display: none;
      }

      &:hover {
        background: $active;
      }
    }
  }

  h1 {
    text-transform: uppercase;
    font-family: 'Unica One', 'Raleway', sans-serif;
    font-size: 2.2rem;
    margin: 0;

    @include width (mobile) {
      font-size: 1.6rem;
    }
  }
  
  h3 {
    opacity: .8;
    font-size: 1rem;
    margin: 0;
    margin-top: $unit;
    font-weight: 400;

    @include width (mobile) {
      font-size: 1rem;
    }
  }

  .sublinks {
    display: inline-block;
    font-weight: 400;
    pointer-events: none;
    box-shadow: 0 10px 20px rgba(#444, .7);

    @include width (mobile) {
      margin-top: 0;
      display: flex;
      box-shadow: none;
    }

    a {
      padding: $unit * 2 $content-padding;
      background: $text;

      &:hover {
        background: $active;
      }

      @include width (mobile) {
        text-align: center;
        flex: 1;
        padding: $unit * 1.5 $unit * 3;

        &:hover {
          background: $text;
        }
      }
    }
  }


  .citylabel {
    position: absolute;
    bottom: $content-padding;
    display: inline-block;
    margin-top: $unit * 3;
    color: rgba(white, .8);
    background: rgba($text, .6);
    padding: $unit * 1 $unit * 4;
    padding-left: $content-padding;
    transition: all .4s;
    transform: translateX(-100%);

    &.active {
      transform: translateX(0%);
    }

    @include width (mobile) {
      display: none;
    }
  }
</style>
