<template>
  <div class="selector">
    <h3 class="sectionhead mini">{{ capitalize(title) }}</h3>
    <div class="buttonlist">
      <nuxt-link 
        class="button secondary thin"
        :to="`/${ urlPrefix }${ item }`"
        exact
        v-for="(item, key) in itemsToShow"
        :key="key"
      >
        {{ capitalize(item) }}
      </nuxt-link>
      <div class="sub" v-if="orderedItems.length < cutoff && moreHint">And more to come...</div>
    </div>
    <div
      class="button secondary full"
      v-if="orderedItems.length > cutoff && !showAll"
      @click="showAll = true"
    >
      Show All Cities
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
    }
  },
  computed: {
    orderedItems () {
      const typeFrequency = {}
      posts.forEach(p => {
        if (this.hide && p[this.type].toLowerCase() === this.hide.toLowerCase()) return
        typeFrequency[p[this.type]] = 
          (typeFrequency[p[this.type]] ? typeFrequency[p[this.type]] + 1 : 1)
      })
      return Object.keys(typeFrequency)
        .sort((a, b) => typeFrequency[a] < typeFrequency[b])
    },
    itemsToShow () {
      return this.showAll ? this.orderedItems : this.orderedItems.slice(0, this.cutoff)
    }
  },
  methods: {
    capitalize,
  }
}
</script>

<style scoped lang="scss">

  .selector {
    margin-bottom: $unit * 5;
  }

  .buttonlist {
    display: flex;
    flex-wrap: wrap;
    justify-content: stretch;
    text-align: center;

    * {
      flex-shrink: 0;
      flex-grow: 1;
      // margin: 0 $unit * 1 $unit * 2 $unit * 1;
      margin: 1px 0;
      border: 2px solid transparent;
      box-shadow: 0 0 0 2px $offwhite;

      &:hover {
        box-shadow: none;
      }
    }

    .sub {
      padding: $unit * 1.5;
      box-shadow: none;
    }

    @include width (mobile) {
      * {
        // margin: 0 $unit * .5 $unit * 1 $unit * .5;
      }

      .sub {
        padding: $unit * 1 0;
      }
    }
  }

</style>
