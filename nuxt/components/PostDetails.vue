<template>
  <p class="sub">
    <nuxt-link
      v-if="category"
      :to="localePath({
            name: 'is-category',
            params: { category: category.toLowerCase() },
          })"
      class="sublink"
    >{{ capitalize(category) }}</nuxt-link>・
    <span
      v-if="mapPosition && ((!Array.isArray(mapPosition) && mapPosition.location) || (mapPosition.length === 1 && mapPosition[0].location))"
    >
      <nuxt-link
        :to="localePath({
            name: 'at-location',
            params: { location: (Array.isArray(mapPosition) ? mapPosition[0].location : mapPosition.location).toLowerCase().replace(/\//g, '%2F') },
          })"
        class="sublink"
      >{{ (Array.isArray(mapPosition) ? mapPosition[0].location : mapPosition.location) }}{{ cityIsLocation ? '' : ', ' }}</nuxt-link>
      {{ cityIsLocation ? ' ・ ' : '' }}
    </span>
    <span v-if="city && !cityIsLocation">
      <nuxt-link
        :to="localePath({
            name: 'city',
            params: { city: city.replace(/\//g, '%2F') },
          })"
        class="sublink"
      >
        {{
        capitalize(city)
        }}
      </nuxt-link>
    </span>
    <span v-if="date">
      ・
      {{
      new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      })
      }}
    </span>
  </p>
</template>

<script>
const { capitalize } = require('~/assets/commonFunctions.js')

export default {
  props: ['category', 'mapPosition', 'city', 'date'],
  computed: {
    cityIsLocation() {
      return (
        this.mapPosition &&
        !Array.isArray(this.mapPosition) &&
        this.city &&
        this.mapPosition.location &&
        this.city.toLowerCase() === this.mapPosition.location.toLowerCase()
      )
    },
  },
  methods: {
    capitalize,
  },
}
</script>

<style lang="scss" scoped>
p {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
  line-height: 1.4;
}
</style>
