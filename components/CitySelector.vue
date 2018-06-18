<template>
  <div class="selector">
    <h3 class="sectionhead">{{ capitalize(this.type) }}</h3>
    <div class="buttonlist">
      <nuxt-link 
        class="button secondary"
        :to="`/${city}`"
        exact
        v-for="(city, key) in citiesToShow"
        :key="key"
      >
        {{ capitalize(city) }}
      </nuxt-link>
      <div class="sub" v-if="orderedCities.length < cutoff">And more to come...</div>
    </div>
    <div
      class="button secondary full"
      v-if="orderedCities.length > cutoff && !showAll"
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
      default: 'cities'
    }
  },
  data () {
    return {
      showAll: false,
      cutoff: 10,
    }
  },
  computed: {
    orderedCities () {
      const cityFrequency = {}
      posts.forEach(p => {
        if (this.hide && p.city.toLowerCase() === this.hide.toLowerCase()) return
        cityFrequency[p.city] = 
          (cityFrequency[p.city] ? cityFrequency[p.city] + 1 : 1)
      })
      return Object.keys(cityFrequency)
        .sort((a, b) => cityFrequency[a] < cityFrequency[b])
    },
    citiesToShow () {
      return this.showAll ? this.orderedCities : this.orderedCities.slice(0, this.cutoff)
    }
  },
  methods: {
    capitalize,
  }
}
</script>

<style scoped lang="scss">

  .selector {
    margin-bottom: $unit * 10;
  }

  .buttonlist {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;

    * {
      flex-shrink: 0;
      margin: 0 $unit * 1 $unit * 2 $unit * 1;
    }

    .sub {
      padding: $unit * 2 0;
    }

    @include width (mobile) {
      * {
        margin: 0 $unit * .5 $unit * 1 $unit * .5;
      }

      .sub {
        padding: $unit * 1 0;
      }
    }
  }

</style>
