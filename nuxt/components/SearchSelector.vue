<template>
  <div class="searchholder content-top-full" :class="{open: isOpen}" v-if="!isMobile">
    <svg
      width="135px"
      height="135px"
      viewBox="0 0 135 135"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <g
        fill="none"
        transform="translate(11.000000, 11.000000)"
        stroke="#979797"
        stroke-width="14"
      >
        <circle id="Oval" cx="42" cy="42" r="42" />
        <path d="M73.5761719,73.5761719 L107.720703,107.720703" id="Line" stroke-linecap="square" />
      </g>
    </svg>
    <input
      placeholder="Search for a City, Place, or Category..."
      v-model="searchTerm"
      class="searchinput"
      :class="{open: isOpen}"
      @focus="open"
    />
    <div class="closebutton" v-if="isOpen" @click="close">
      <div>✕</div>
    </div>
    <div class="megalist" v-if="isOpen">
      <div class="listsectionlabel" v-if="orderedCategories.length">Category</div>
      <div class="listentry" v-for="element, key in orderedCategories" :key="'cat' + key">
        <nuxt-link
          class="listlink"
          :to="localePath({
            name: 'is-category',
            params: { category: element.label },
          })"
        >
          {{capitalize(element.label)}}
          <span class="sub">
            <span class="sub">{{element.count}}</span>
          </span>
        </nuxt-link>
      </div>
      <div class="listsectionlabel" v-if="orderedCities.length">City</div>
      <div class="listentry" v-for="element, key in orderedCities" :key="'cit' + key">
        <nuxt-link
          class="listlink"
          :to="localePath({
            name: 'city',
            params: { city: element.label.replace(/\//g, '%2F') },
          })"
        >
          {{capitalize(element.label)}}
          <span class="sub">
            <span class="sub">{{element.count}}</span>
          </span>
        </nuxt-link>
      </div>
      <template v-if="searchTerm !== ''">
        <div class="listsectionlabel" v-if="tags.length">Tag</div>
        <div class="listentry" v-for="element, key in tags" :key="'tag' + key">
          <nuxt-link
            class="listlink"
            :to="localePath({
            name: 'tag-tag',
            params: { tag: element.replace(/\//g, '%2F')},
          })"
          >{{capitalize(element)}}</nuxt-link>
        </div>
        <div class="listsectionlabel" v-if="locations.length">Place</div>
        <div class="listentry" v-for="element, key in locations" :key="'loc' + key">
          <nuxt-link
            class="listlink"
            :to="localePath({
            name: 'at-location',
            params: { location: element.replace(/\//g, '%2F')},
          })"
          >{{capitalize(element)}}</nuxt-link>
        </div>
      </template>
      <div
        class="listsectionlabel"
        v-if="!locations.length && !orderedCities.length && !orderedCategories.length"
      >No results found.</div>
    </div>
  </div>
</template>

<script>
const { capitalize } = require('~/assets/commonFunctions.js')

export default {
  props: {},
  data() {
    return {
      isOpen: false,
      searchTerm: '',
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile
    },
    isDev() {
      return this.$store.state.viewingAsDev
    },
    currentShowablePosts() {
      return this.$store.state.currentShowablePosts
    },
    locations() {
      return this.$store.state.locations
        .map(l => l.toLowerCase())
        .filter(text => text.indexOf(this.searchTerm.toLowerCase()) !== -1)
        .sort((a, b) => (a > b ? 1 : -1))
    },
    tags() {
      return this.$store.state.tags
        .filter(text => text.indexOf(this.searchTerm.toLowerCase()) !== -1)
        .sort((a, b) => (a > b ? 1 : -1))
    },
    orderedCities() {
      const cityFrequency = {}
      this.currentShowablePosts.forEach(p => {
        const cityName = p.city.toLowerCase()
        cityFrequency[cityName] = (cityFrequency[cityName] || 0) + 1
      })
      return Object.keys(cityFrequency)
        .map(key => ({ label: key, count: cityFrequency[key] }))
        .filter(
          element => element.label.indexOf(this.searchTerm.toLowerCase()) !== -1
        )
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
        .filter(
          element => element.label.indexOf(this.searchTerm.toLowerCase()) !== -1
        )
        .sort((a, b) => typeFrequency[b.label] - typeFrequency[a.label])
    },
  },
  methods: {
    capitalize,
    open() {
      this.isOpen = true
      window.addEventListener('mousedown', this.checkForClose)
    },
    checkForClose(event) {
      if (
        !(event.path || (event.composedPath && event.composedPath())).includes(
          this.$el
        )
      )
        this.close()
    },
    close() {
      this.searchTerm = ''
      window.removeEventListener('mousedown', this.checkForClose)
      this.isOpen = false
    },
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/variables.scss';

$searchcolor: lighten($shade, 1.5%);

.searchholder {
  position: relative;
  z-index: 4;
  background: $searchcolor;
  padding-top: 0;
  padding-bottom: 0;
  height: $unit * 8;
  color: $text;
  transition: all 0.2s;
  border-bottom: 1px solid rgba($offwhite, 0.3);

  &:after {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 77%;
    left: $content-padding;
    right: $content-padding;
    height: 2px;
    background: rgba($text, 0.1);
    transform-origin: left;
    transform: scale(0, 1);
    opacity: 0;
    transition: all 0.4s;
  }

  &:hover,
  &.open {
    top: 0;
    background: darken($searchcolor, 3%);
    border-bottom: 1px solid transparent;

    &:after {
      opacity: 1;
      transform: scale(1, 1);
    }
  }

  svg {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.3;
    width: $unit * 3;
    height: $unit * 3;

    g {
      stroke: $text;
    }
  }

  &.open {
    background: rgba(lighten($text, 0%), 0.97);
    color: rgba(white, 1);
    height: $unit * 16;
    border-bottom: none;

    &:after {
      background: rgba(white, 0.3) !important;
    }

    svg {
      opacity: 0.7;

      g {
        stroke: white;
      }
    }

    .closebutton {
      position: absolute;
      color: white;
      opacity: 0.6;
      line-height: 1;
      padding: 10px 30px;
      display: flex;
      align-items: center;
      top: 0;
      right: $content-padding/2;
      bottom: 0;
      transition: all 0.2s;

      &:hover {
        cursor: pointer;
        opacity: 1;
        // background: rgba(white, 0.2);
      }
    }
  }

  .searchinput {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    outline: none;
    padding: 0 0 0 $unit * 14;
    margin: 0;
    color: rgba($text, 0.7);
    font-family: $font-stack;
    font-size: 0.9rem;
    border: none;
    transition: all 0.2s;
    cursor: pointer;
    background: transparent;

    &::placeholder {
      // opacity: 0.7;
    }

    &.open {
      color: rgba(white, 1);
      font-size: 1.5rem;
      line-height: 1;
    }
  }
  .megalist {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(lighten($text, 0%), 0.97);
    color: rgba(white, 0.7);
    padding: 0 0 $unit * 12 0;
    // max-height: $unit * 60;
    overflow-y: auto;

    .listsectionlabel {
      text-transform: uppercase;
      font-weight: 700;
      font-size: 0.8em;
      opacity: 1;
      color: white;
      margin: $unit * 4 0 $unit 0;
      padding: 0 $unit * 4 0 $content-padding;
    }

    .listlink {
      display: block;
      color: rgba(white, 0.7);
      text-decoration: none;
      padding: $unit / 1.5 $unit * 4 $unit / 1.5 $unit * 16;
      transition: all 0.2s;

      &:hover {
        color: $active;
        // font-weight: 600;
        // padding-left: $unit * 8.5;
        background: rgba(white, 0.05);
      }
    }
  }
}

.content-top-full:first-of-type {
  height: $unit * 12;
}
</style>
