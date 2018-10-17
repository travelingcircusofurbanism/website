<template>
  <div id="header" :class="{hide: scrollDirection === 'down'}">
    <nuxt-link 
      exact
      to="/"
      class="logo"
      @click.native="resetView"
    >
      <h1>Traveling Circus of Urbanism</h1>
      <h3 class="tagline">Urban narratives and practices, collected through traveling</h3>
    </nuxt-link>
    <br />
    <div class="sublinks">
      <nuxt-link to="/about">About</nuxt-link><nuxt-link to="/getinvolved">Get Involved</nuxt-link>
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
const { capitalize } = require('~/assets/commonFunctions.js')

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
    capitalize,
    resetView () {
      this.$store.commit('setView', this.$store.state.allPublicPosts)
      this.$store.commit('setPan', false)
      this.$nextTick(() => this.$store.commit('setPan', true))
    },
  }
}

</script>

<style scoped lang="scss">
@import '~/assets/variables.scss';

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
    z-index: 10;
    height: 100vh;
    pointer-events: none;
    max-width: 48%;
    padding-right: $unit * 4;

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
      padding-right: 0;

      &.hide {
        bottom: 100%;
      }
    }
  }

  .logo {
    display: inline-block;
    padding: $unit * 3.5 $unit * 4.5 $unit * 3 $content-padding;
    font-weight: 600;
    background: $active;
    box-shadow: $over-map-shadow;

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
    // margin-top: $unit / 2;
    font-weight: 400;

    @include width (mobile) {
      font-size: 1rem;
    }
  }

  .sublinks {
    display: inline-block;
    font-weight: 400;
    pointer-events: none;
    background: $text;
    box-shadow: $over-map-shadow;
    padding-left: $content-padding / 2;

    @include width (mobile) {
      padding-left: 0;
      margin-top: 0;
      display: flex;
      box-shadow: none;
    }

    a {
      padding: $unit * 2 $content-padding / 2;
      background: $text;
      position: relative;

      &:after {
        content: '';
        position: absolute;
        bottom: 22%;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        background: $active;
        height: 2px;
        transition: all .2s;
      }

      &:hover {
        &:after {
          width: 40px;
        }
        background: rgba($active, .25);
      }

      @include width (mobile) {
        text-align: center;
        flex: 1;
        padding: $unit * 1.5 $unit * 3;

        &:after {
          display: none;
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
    background: rgba($text, .75);
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
