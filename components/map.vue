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
    mounted () {
      mapboxgl.accessToken = require('../mapboxApiKey.json').key;

      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mariko9012/cj8pt8dq29zj32rqmvtu6zcqy',
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
    height: 100vh;
    background:#ddd;
  }
</style>
