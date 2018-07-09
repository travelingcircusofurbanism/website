<template>
  <div class="selectorframe">
    <h3
      class="sectionhead mini"
      @click="isOpen = !isOpen"
    >
      {{ capitalize(title) }}
      <span v-if="isMobile">({{ orderedItems.length }})</span>
      <span
        v-if="isMobile"
        class="toggle"
        :class="{open: isOpen}"
      >►</span>
    </h3>
    <div v-if="!isMobile || isOpen" class="selector">
      <div class="buttonlist">
        <nuxt-link 
          class="button secondary mini"
          :to="`/${ urlPrefix }${ item }`"
          exact
          v-for="(item, key) in itemsToShow"
          :key="key"
        >
          {{ capitalize(item) }}
        </nuxt-link>
        <div class="sub" v-if="orderedItems.length < responsiveCutoff && moreHint">And more to come...</div>
        <div
          class="button secondary mini showall"
          v-if="orderedItems.length > responsiveCutoff && !showAll"
          @click="showAll = true"
        >
          Show All Cities
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const posts = require('~/static/generated/posts.json')
import { capitalize } from '~/assets/commonFunctions.js'

export default {
  props: {
    hide: {
      required: false,
      type: String
    },
    type: {
      required: false,
      type: String,
      default: 'city'
    },
    title: {
      required: false,
      default: 'Cities'
    },
    urlPrefix: {
      required: false,
      default: ''
    },
    cutoff: {
      required: false,
      type: Number,
      default: 10
    },
    moreHint: {
      required: false,
      type: Boolean,
      default: true
    },
  },
  data () {
    return {
      showAll: false,
      isOpen: false,
    }
  },
  computed: {
    isMobile () { return this.$store.state.isMobile },
    isDev () { return this.$store.state.isDev },
    usablePosts () {
      return this.isDev ?
        posts :
        posts.filter(p => p.public)
    },
    orderedItems () {
      const typeFrequency = {}
      this.usablePosts.forEach(p => {
        if (this.hide && p[this.type].toLowerCase() === this.hide.toLowerCase()) return
        typeFrequency[p[this.type]] = 
          (typeFrequency[p[this.type]] ? typeFrequency[p[this.type]] + 1 : 1)
      })
      return Object.keys(typeFrequency)
        .sort((a, b) => typeFrequency[a] < typeFrequency[b])
    },
    responsiveCutoff () {
      return parseInt(this.cutoff / (this.isMobile ? 2 : 1))
    },
    itemsToShow () {
      console.log()
      return (
        this.showAll ? 
          this.orderedItems : 
          this.orderedItems.slice(0, this.responsiveCutoff)
      )
    }
  },
  methods: {
    capitalize,
  }
}
</script>

<style scoped lang="scss">

  .selectorframe {
    display: grid;
    grid-template-columns: 120px 1fr;
    grid-gap: $unit * 3;

    .sectionhead {
      margin: 0;
      margin-top: $unit * 1.5;
    }

    @include width (mobile) {
      grid-template-columns: 1fr;
      grid-gap: 0;

      .sectionhead {
        text-align: left;
        margin-top: 0;
      }
    }
  }

  .selector {
    margin-bottom: $unit * 4;

    @include width (mobile) {
      margin-bottom: $unit * 2;
    }
  }

  .toggle {
    margin-left: $unit;
    opacity: .3;
    font-size: .7em;
    display: inline-block;
    transition: all .2s;
    transform: rotate(0deg);

    &.open {
      transform: rotate(90deg);
    }
  }

  .buttonlist {
    display: flex;
    flex-wrap: wrap;
    justify-content: stretch;
    text-align: center;

    .sub {
      border: 2px solid transparent;
      padding: $unit * 1 $unit * 1.5;
      box-shadow: none;
      flex: 1;
      white-space: nowrap;
    }

    @include width (mobile) {

      .sub {
        padding: $unit * 1 0;
      }
    }
  }

  .button {
    flex-shrink: 0;
    flex-grow: 1;
  }

</style>
