<template>
  <div id="map">
  </div>
</template>

<script>
  export default {
    data () {
      return {
        map: null
      }
    },
    computed: {
      mapPosition () { return this.$store.state.mapPosition},
    },
    watch: {
      mapPosition (newPosition) {
        this.map.flyTo(newPosition)
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
