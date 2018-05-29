<template>
  <div>
    <h3 class="sectionhead">Cities</h3>
    <div class="selector">
      <nuxt-link 
        class="button secondary"
        :to="`/${city}`"
        exact
        v-for="(city, key) in orderedCities"
        :key="key"
      >
        {{ capitalizeFirstLetter(city) }}
      </nuxt-link>
      <div class="sub">And more to come...</div>
    </div>
  </div>
</template>

<script>
const posts = require('~/static/posts.json')

export default {
  props: {
    hide: {
      required: false,
      type: String
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
    }
  },
  methods: {
    capitalizeFirstLetter (s) {
      if (!s) return ''
      return s.substring(0,1).toUpperCase() + s.substring(1)
    },
  }
}
</script>

<style scoped lang="scss">

  .selector {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    margin-bottom: $unit * 10;

    * {
      flex-shrink: 0;
      margin: 0 $unit * 2 $unit * 2 $unit * 2;
    }

    .sub {
      padding: $unit * 2 0;
    }
  }

</style>
