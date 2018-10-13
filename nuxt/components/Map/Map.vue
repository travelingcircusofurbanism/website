<template>
  <div>
  
    <MapboxMapLoader
			:apikey="ak"
			:defaultPosition="defaultPosition"
      mapboxStyle="mapbox://styles/mariko9012/cjh4gkzlw31mc2sqsm3l0g4rk?optimize=true"
		>
			<template slot-scope="{ mapboxgl, map, clusterer }">

        <MarkerManager
          :mapboxgl="mapboxgl"
          :map="map"
          :clusterer="clusterer"
          @updateMarkers="updateMarkers"
        />

        <Controller
          :mapboxgl="mapboxgl"
          :map="map"
          :clusterer="clusterer"
          :markers="markers"
        />

        <MapMarker
          v-if="markers"
          v-for="marker, key in markers"
          :key="key + '_' + updatePrefix"
          :mapboxgl="mapboxgl"
          :map="map"
          :clusterer="clusterer"
          :markerData="marker"
        />

        <!--<DebugMarker
          :mapboxgl="mapboxgl"
          :map="map"
          :coordinates="[139.7029729, 35.5720944]"
        />-->

			</template>
		</MapboxMapLoader>

  </div>
</template>

<script>

import MapboxMapLoader from '~/components/Map/MapboxMapLoader'
import MapMarker from '~/components/Map/MapMarker'
import Controller from '~/components/Map/Controller'
import MarkerManager from '~/components/Map/MarkerManager'
// import DebugMarker from '~/components/Map/DebugMarker'

export default {
  components: { MapboxMapLoader, MapMarker, Controller, MarkerManager, /*DebugMarker*/ },
  data () {
    return {
      defaultPosition: {
        bearing: 0,
        center: [-130, 30],
        zoom: 1.5,
        pitch: 0,
        speed: 2,
      },
      ak: require('../../mapboxApiKey.json').key,
      markers: [],
      updatePrefix: 0,
    }
  },

  computed: {
    currentView () { return this.$store.state.currentView },
  },

  watch: {
    currentView (newView) {
      if (!newView || Object.keys(newView).length === 0)
        this.$emit('close')
      else this.$emit('open')
    },
  },

  methods: {
    updateMarkers (newMarkers) {
      this.updatePrefix++
      this.markers = newMarkers
    }
  }
}

</script>

<style lang="scss" scoped>
</style>
