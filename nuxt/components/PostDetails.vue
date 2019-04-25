<template>
  <p class="sub">
    <nuxt-link
      v-if="category"
      :to="'/is/' + category.toLowerCase()"
      class="sublink"
    >{{ capitalize(category) }}</nuxt-link>・
    <span
      v-if="mapPosition && (!Array.isArray(mapPosition) || mapPosition.length === 1) && (mapPosition.location || mapPosition[0].location)"
    >
      <nuxt-link
        :to="'/at/' + (mapPosition.location || mapPosition[0].location).toLowerCase()"
        class="sublink"
      >{{ (mapPosition.location || mapPosition[0].location) }}</nuxt-link>
      {{ cityIsLocation ? ' ・ ' : ', ' }}
    </span>
    <span v-if="city && !cityIsLocation">
      <nuxt-link :to="'/' + city" class="sublink">
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
      month: 'long',
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
}
</style>
