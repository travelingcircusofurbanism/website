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
          <path d="M0,10 L107,10" />
          <path d="M0,35 L107,35" />
          <path d="M0,60 L107,60" />
        </g>
      </svg>
    </div>
    <nuxt-link
      exact
      :to="localePath('index')"
      class="logo"
      :class="{ hasshadow: !canvasImage }"
      @click.native="resetView"
    >
      <img src="/assets/logo.svg" alt="logo" />
    </nuxt-link>
    <br />
    <div
      class="sublinks"
      :class="{ hasshadow: false && !canvasImage }"
      v-if="!isMobile"
    >
      <nuxt-link
        :to="localePath('about')"
        :class="{ currentpage: path === '/about' }"
        >About</nuxt-link
      >
      <nuxt-link
        :to="localePath('contribute')"
        :class="{ currentpage: path === '/contribute' }"
        >Contribute</nuxt-link
      >
      <a href="https://travelingurbanism.stores.jp/" target="_blank">Zines</a>
      <nuxt-link
        :to="localePath('bridgeto')"
        :class="{ currentpage: path === '/bridgeto' }"
        >Residency</nuxt-link
      >
      <a
        class="thumb"
        href="https://www.instagram.com/mariko_urbannomad/"
        target="_blank"
      >
        <img src="~/assets/icons/instagramblack.svg" alt="Instagram" />
      </a>
      <a
        class="thumb"
        href="https://www.facebook.com/travelingcircusofurbanism/"
        target="_blank"
      >
        <img
          class="facebook"
          src="~/assets/icons/facebookblack.svg"
          alt="Facebook"
        />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
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
    canvasImage() {
      return this.$store.state.canvasImage
    },
  },
  mounted() {},
  methods: {
    // switchLocaleTo(newLocale) {
    //   // this.$i18n.setLocaleCookie(newLocale)
    //   this.$router.replace(this.switchLocalePath(newLocale))
    // },
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
  line-height: 1;
  position: fixed;
  display: inline-block;
  top: $header-offset;
  z-index: 10;
  height: 100vh;
  pointer-events: none;
  max-width: 48%;
  padding-right: $unit * 4;

  @include width(mobile) {
    line-height: 1.6;
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
  display: inline-flex !important;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  padding: $unit * 2.5 $unit * 3.8 $unit * 0.5 $unit * 4;
  background: $active;
  background: linear-gradient(to right, $active, lighten($active, 3%));
  height: $unit * 8;
  width: 100%;

  &.hasshadow {
    box-shadow: $over-map-shadow;
  }

  @include width(mobile) {
    height: auto;
    box-shadow: none;
    width: 100%;
    padding: $unit * 2.2 $unit * 3 $unit * 2.2 $unit * 8;
  }

  img {
    width: 100%;
    height: $unit * 5;
    display: block;

    @include width(mobile) {
      max-height: $unit * 3.8;
    }
  }

  .tagline {
    color: saturate(lighten($active, 53%), 20%);
    font-size: 1rem;
    margin: 0;
    font-weight: 400;
    white-space: nowrap;
    width: 100%;
    // text-align-last: justify;
    // text-align: justify;

    @include width(mobile) {
      display: none;
    }
  }
}

.sublinks {
  position: relative;
  display: inline-flex;
  font-weight: 400;
  pointer-events: none;
  // background: darken($text, 2%);
  background: $active;
  background: linear-gradient(to right, $active, lighten($active, 3%));
  width: 100%;
  padding: 0 $content-padding / 3.3 0 $content-padding / 5;

  &.hasshadow {
    box-shadow: $over-map-shadow;
  }

  @include width(mobile) {
    display: none;
  }

  & > a {
    text-align: center;
    padding: $unit * 1.8 $content-padding / 2.7;
    position: relative;
    display: inline-block;
    white-space: nowrap;
    color: $text;
    font-weight: 700;
    letter-spacing: 0.5px;
    font-size: 0.93em;
    transition: color 0.2s;

    // &:after {
    //   $underlineheight: 1px;
    //   content: '';
    //   position: absolute;
    //   bottom: 0; //($unit * 2) - $underlineheight;
    //   left: 50%;
    //   transform: translateX(-50%);
    //   // border-radius: $underlineheight / 2;
    //   width: 0;
    //   background: $active;
    //   height: $underlineheight;
    //   transition: all 0.2s;
    // }

    &:hover {
      &:after {
        width: 100%;
      }
      background: rgba(white, 0.1);
    }

    &.currentpage {
      color: rgba(white, 0.7);
      &:after {
        width: 100%;
      }
    }

    &.highlight {
      color: lighten($active, 10%);
    }

    @include width(mobile) {
      text-align: center;
      flex: 1;
      padding: $unit * 1.5 $unit * 0;

      &:after {
        display: none;
      }
    }

    &.thumb {
      padding: $unit * 1.8 $content-padding / 5;
    }
    img {
      height: 1.15em;
      position: relative;
      top: -0.08em;

      &.facebook {
        // height: 1.05em;
        // top: -0.03em;
      }
    }
  }
}

// .citylabel {
//   position: absolute;
//   bottom: $content-padding;
//   display: inline-block;
//   margin-top: $unit * 3;
//   color: rgba(white, 0.8);
//   background: rgba($text, 0.75);
//   padding: $unit * 1 $unit * 4;
//   padding-left: $content-padding;
//   transition: all 0.4s;
//   transform: translateX(-100%);

//   &.active {
//     transform: translateX(0%);
//   }

//   @include width(mobile) {
//     display: none;
//   }
// }
</style>
