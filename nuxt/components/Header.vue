<template>
  <div id="header" :class="{ hide: scrollDirection === 'down' }">
    <div class="hamburger" v-if="isMobile" @click="openMobileSearchSelector">
      <svg
        width="122px"
        height="85px"
        viewBox="0 0 107 71"
        version="1.1"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <g stroke="#979797" stroke-width="8">
          <path d="M0,10 L107,10" id="Line-2"></path>
          <path d="M0,35 L107,35" id="Line-2-Copy"></path>
          <path d="M0,60 L107,60" id="Line-2-Copy-2"></path>
        </g>
      </svg>
    </div>
    <nuxt-link exact to="/" class="logo" @click.native="resetView">
      <h1>Traveling Circus of Urbanism</h1>
      <h3 class="tagline">Urban narratives and practices, collected through traveling</h3>
    </nuxt-link>
    <br>
    <div class="sublinks" v-if="!isMobile">
      <nuxt-link to="/about" :class="{ currentpage: path === '/about' }">About</nuxt-link>
      <nuxt-link to="/getinvolved" :class="{ currentpage: path === '/getinvolved' }">Get Involved</nuxt-link>
    </div>
    <div>
      <div class="citylabel" :class="{ active: currentCity }">
        Current City:
        <span>{{ capitalize(currentCity) }}</span>
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
  data() {
    return {
      prevScrollTop: 0,
      scrollDirection: 'up',
    }
  },
  computed: {
    currentCity() {
      return this.$store.state.currentCity
    },
    isMobile() {
      return this.$store.state.isMobile
    },
    path() {
      return this.$nuxt.$route.path
    },
  },
  mounted() {},
  methods: {
    capitalize,
    resetView() {
      this.$store.commit('setView', this.$store.state.currentShowablePosts)
      this.$store.commit('setPan', false)
      this.$nextTick(() => this.$store.commit('setPan', true))
    },
    openMobileSearchSelector() {
      this.$store.commit('setMobileSearchSelectorIsOpen', true)
    },
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/variables.scss';

a,
a:hover,
a:visited,
a:active {
  display: inline-block;
  color: white;
  text-decoration: none;
  transition: 0.2s;
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

  @include width(mobile) {
    display: block;
    width: 100%;
    height: auto;
    max-width: 100%;
    position: relative;
    top: 0;
    left: 0;
    overflow: hidden;
    transition: all 0.4s;
    padding-right: 0;

    &.hide {
      bottom: 100%;
    }
  }
}

.hamburger {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  height: 100%;
  padding: 0 $unit * 2;
  color: white;
  pointer-events: auto;
  display: flex;
  align-items: center;

  svg {
    width: $unit * 3.5;
    height: $unit * 3;

    g {
      stroke: white;
    }
  }
}

.logo {
  display: inline-block;
  position: relative;
  padding: $unit * 3.5 $unit * 4.5 $unit * 3 $content-padding * 0.75;
  font-weight: 600;
  background: $active;
  box-shadow: $over-map-shadow;

  @include width(mobile) {
    box-shadow: none;
    width: 100%;
    padding: $unit * 2 $unit $unit * 2 $unit * 8;

    .tagline {
      display: none;
    }

    &:hover {
      background: $active;
    }
    h1 {
      font-size: 1.45rem;
    }
  }
}

h1 {
  text-transform: uppercase;
  font-family: 'Unica One', 'Raleway', sans-serif;
  font-size: 2.2rem;
  margin: 0;
  color: white !important;

  @include width(mobile) {
    font-size: 1.6rem;
  }
}

h3 {
  opacity: 0.8;
  font-size: 1rem;
  margin: 0;
  // margin-top: $unit / 2;
  font-weight: 400;

  @include width(mobile) {
    font-size: 1rem;
  }
}

.sublinks {
  display: inline-block;
  font-weight: 400;
  pointer-events: none;
  background: $text;
  box-shadow: $over-map-shadow;
  padding-left: $content-padding / 4;

  @include width(mobile) {
    padding-left: 0;
    margin-top: 0;
    display: flex;
    box-shadow: none;
  }

  & > a {
    padding: $unit * 2 $content-padding / 2;
    background: $text;
    position: relative;

    &:after {
      $underlineheight: 3px;
      content: '';
      position: absolute;
      bottom: 0; //($unit * 2) - $underlineheight;
      left: 50%;
      transform: translateX(-50%);
      // border-radius: $underlineheight / 2;
      width: 0;
      background: $active;
      height: $underlineheight;
      transition: all 0.2s;
    }

    &:hover {
      &:after {
        width: 100%;
      }
      background: rgba($active, 0.25);
    }

    &.currentpage {
      &:after {
        width: 100%;
      }
    }

    @include width(mobile) {
      text-align: center;
      flex: 1;
      padding: $unit * 1.5 $unit * 0;

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
  color: rgba(white, 0.8);
  background: rgba($text, 0.75);
  padding: $unit * 1 $unit * 4;
  padding-left: $content-padding;
  transition: all 0.4s;
  transform: translateX(-100%);

  &.active {
    transform: translateX(0%);
  }

  @include width(mobile) {
    display: none;
  }
}
</style>
