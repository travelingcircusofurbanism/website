<template>
  <transition name="fade">
    <div class="fullscreenoverlay" v-if="isMobile && isOpen">
      <div class="closebutton" @click="close">
        <div>✕</div>
      </div>
      <div class="megalist">
        <div class="listsectionlabel sitename">
          <nuxt-link to="/" @click.native="close" exact>
            <img src="~/static/assets/logo vert blue.svg" alt="logo" />
          </nuxt-link>
        </div>

        <div class="listentry">
          <nuxt-link
            class="listlink"
            :to="localePath('about')"
            @click.native="close"
            >About</nuxt-link
          >
        </div>
        <div class="listentry">
          <nuxt-link
            class="listlink"
            :to="localePath('getinvolved')"
            @click.native="close"
            >Get Involved</nuxt-link
          >
        </div>
        <div class="listentry">
          <a
            href="https://travelingurbanism.stores.jp/"
            class="listlink"
            target="_blank"
            @click.native="close"
            >Zines</a
          >
        </div>

        <div class="listentry">
          <nuxt-link
            class="listlink"
            :to="switchLocalePath('en')"
            v-if="$i18n.locale === 'ja'"
            @click.native="close"
            >English Site</nuxt-link
          >
        </div>
        <div class="listentry">
          <nuxt-link
            class="listlink"
            :to="switchLocalePath('ja')"
            v-if="$i18n.locale === 'en'"
            @click.native="close"
            >日本語サイト</nuxt-link
          >
        </div>
        <div class="listentry">
          <div class="listlink">
            <a
              class="thumb"
              href="https://www.instagram.com/mariko_urbannomad/"
              target="_blank"
            >
              <img src="~/assets/icons/instagram.svg" alt="Instagram" />
            </a>
            <a
              class="thumb"
              href="https://www.facebook.com/travelingcircusofurbanism/"
              target="_blank"
            >
              <img
                class="facebook"
                src="~/assets/icons/facebook.svg"
                alt="Facebook"
              />
            </a>
          </div>
        </div>

        <div class="listsectionlabel">Categories</div>
        <div
          class="listentry"
          v-for="(element, key) in orderedCategories"
          :key="'cat' + key"
        >
          <nuxt-link
            class="listlink"
            :to="
              localePath({
                name: 'is-category',
                params: { category: element.label },
              })
            "
            @click.native="close"
          >
            {{ capitalize(element.label) }}
            <span class="sub">
              <span class="sub">{{ element.count }}</span>
            </span>
          </nuxt-link>
        </div>
        <div class="listsectionlabel">Cities</div>
        <div
          class="listentry"
          v-for="(element, key) in orderedCities"
          :key="'cit' + key"
        >
          <nuxt-link
            class="listlink"
            :to="
              localePath({
                name: 'city',
                params: { city: element.label.replace(/\//g, '%2F') },
              })
            "
            @click.native="close"
          >
            {{ capitalize(element.label) }}
            <span class="sub">
              <span class="sub">{{ element.count }}</span>
            </span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
const { capitalize } = require('~/assets/commonFunctions.js')

export default {
  props: {},
  computed: {
    isMobile() {
      return this.$store.state.isMobile
    },
    isOpen() {
      return this.$store.state.mobileSearchSelectorIsOpen
    },
    isDev() {
      return this.$store.state.viewingAsDev
    },
    currentShowablePosts() {
      return this.$store.state.currentShowablePosts
    },
    orderedCities() {
      const cityFrequency = {}
      this.currentShowablePosts.forEach(p => {
        const cityName = p.city.toLowerCase()
        cityFrequency[cityName] = (cityFrequency[cityName] || 0) + 1
      })
      return Object.keys(cityFrequency)
        .map(key => ({ label: key, count: cityFrequency[key] }))
        .sort((a, b) => (a.label > b.label ? 1 : -1))
    },

    orderedCategories() {
      const typeFrequency = {}
      this.currentShowablePosts.forEach(p => {
        const typeName = p.category.toLowerCase()
        typeFrequency[typeName] = (typeFrequency[typeName] || 0) + 1
      })
      return Object.keys(typeFrequency)
        .map(key => ({ label: key, count: typeFrequency[key] }))
        .sort((a, b) => typeFrequency[b.label] - typeFrequency[a.label])
    },
  },
  methods: {
    capitalize,
    open() {
      this.isOpen = true
    },
    close() {
      this.$nextTick(() => {
        this.$store.commit('setMobileSearchSelectorIsOpen', false)
      })
    },
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/variables.scss';

$overlaybg: rgba($text, 1);

.fullscreenoverlay {
  position: fixed;
  font-size: 1.2em;
  z-index: 1000;
  background: $overlaybg;
  overflow-y: auto;
  height: 100vh;
  width: 100vw;
  color: white;
  transition: all 0.2s;
  padding: $content-padding-mobile * 2 $content-padding-mobile;

  .closebutton {
    position: fixed;
    color: white;
    opacity: 1;
    line-height: 1;
    padding: 20px 20px;
    display: flex;
    align-items: center;
    top: 0;
    right: 0;
    transition: all 0.2s;
  }

  .megalist {
    width: 100%;
    color: rgba(white, 0.7);
    padding: 0 0 $unit * 8 0;
    overflow-y: auto;

    .listsectionlabel {
      text-transform: uppercase;
      font-weight: 700;
      font-size: 0.8em;
      opacity: 1;
      color: white;
      margin: $unit * 4 0 $unit 0;
      padding: 0 $unit * 4 0 $content-padding-mobile;

      @include width(mobile) {
        margin: $unit * 4 0 $unit * 2 0;
      }

      &.sitename {
        margin-left: $content-padding-mobile;
        padding: 0;
        a {
          display: inline-block;
          text-decoration: none;
        }
      }
    }

    .listlink {
      display: block;
      color: rgba(white, 0.7);
      text-decoration: none;
      padding: $unit / 1.5 $unit * 4 $unit / 1.5 $unit * 12;
      transition: all 0.2s;

      @include width(mobile) {
        padding: $unit $unit * 4 $unit $unit * 10;
      }
    }
  }
}

.thumb {
  padding: $unit * 1.8 $content-padding-mobile / 5;
  margin-right: $unit * 2;

  img {
    height: 1.15em;
    position: relative;
    top: 0.3em;

    &.facebook {
      height: 1.02em;
      top: 0.25em;
    }
  }
}
</style>
