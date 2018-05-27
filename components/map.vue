<template>
  <div id="map">
  </div>
</template>

<script>
  export default {
    data () {
      return {
        map: null,
        currentMarkers: []
      }
    },
    computed: {
      mapPosition () { return this.$store.state.mapPosition},
      markerData () {
        return {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [this.mapPosition.center[0], this.mapPosition.center[1]]
            },
            properties: {
              title: 'Marker Test',
              description: 'Testing!'
            }
          }]
        }
      }
    },
    watch: {
      mapPosition (newPosition) {
        this.map.flyTo(newPosition)
      },
      markerData (newMarkers) {
        this.currentMarkers.forEach(marker => {
          marker.remove()
        })
        this.currentMarkers = []
        this.markerData.features.forEach(marker => {

          // create a HTML element for each feature
          var el = document.createElement('div')
          el.className = 'marker'

          // make a marker for each feature and add to the map
          const newMarker = new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(this.map)

          this.currentMarkers.push(newMarker)
        })
      }
    },
    mounted () {
      mapboxgl.accessToken = require('../mapboxApiKey.json').key;

      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mariko9012/cjh4gkzlw31mc2sqsm3l0g4rk',
        bearing: 0,
        center: [139.905913, 35.712899],
        zoom: 8.34,
        speed: 1.0,
        pitch: 0
      });
    }
  }

</script>

<style scoped>
  #map {
    height: 120vh;
    position: relative;
    top: -10vh;
    background:#ddd;
    z-index: 2;
  }
</style>
