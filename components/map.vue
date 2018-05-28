<template>
  <div id="map">
  </div>
</template>

<script>
  export default {
    data () {
      return {
        map: null,
        currentMarkers: [],
      }
    },
    computed: {
      mapMarkers () { return this.$store.state.mapMarkers },
      highlight () { return this.$store.state.highlightedLocation },
      markerData () {
        const uniqueLocations = {}
        for (let marker of this.mapMarkers) {
          const location = marker.locationName ? marker.locationName.toLowerCase() : ''
          if (!uniqueLocations[location])
            uniqueLocations[location] = []
          uniqueLocations[location].push(marker)
        }
        const markerData = {
          type: 'FeatureCollection',
          features: []
        }
        for (let marker of Object.values(uniqueLocations)) {
          markerData.features.push({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [marker[0].position.center[0], marker[0].position.center[1]]
            },
            properties: {
              locationName: marker[0].locationName,
              posts: [...marker]
            }
          })
        }
        return markerData
      },
      mapPosition () {
        if (!this.mapMarkers || this.mapMarkers.length === 0) return
        const position = this.mapMarkers[0].position
        if (this.mapMarkers.length > 1) position.zoom = 10
        return position
      },
    },
    watch: {
      mapPosition (newPosition) {
        if (newPosition) this.map.flyTo(newPosition)
      },
      markerData (newMarkers) {
        if (!newMarkers) return
        this.currentMarkers.forEach(marker => {
          marker.remove()
        })
        this.currentMarkers = []
        this.markerData.features.forEach(marker => {

          const popup = new mapboxgl.Popup({
            offset: 20,
            closeButton: false,
            location: marker.properties.locationName
          })
            .setHTML(`<div>${marker.properties.locationName}</div><a onClick="goTo('${marker.properties.url}')">${marker.properties.title}</a>`)

          // create a HTML marker for each feature
          const markerElement = document.createElement('div')
          markerElement.className = 'marker'
          const pin = document.createElement('div')
          pin.className = 'pin'
          const textBox = document.createElement('div')
          textBox.className = 'text'
          const text = document.createTextNode(marker.properties.locationName)
          textBox.appendChild(text)
          markerElement.appendChild(textBox)
          markerElement.appendChild(pin)

          // make a marker for each feature and add to the map
          const newMarker = new mapboxgl.Marker(markerElement)
            .setLngLat(marker.geometry.coordinates)
            .setPopup(popup)
            .addTo(this.map)

          this.currentMarkers.push(newMarker)
        })
      },
      highlight (newHighlight, oldHighlight) {
        const oldEl = this.currentMarkers
          .find(m => m._popup.options.location === oldHighlight)
        if (oldEl) oldEl._element.classList.remove('highlight')
        const newEl = this.currentMarkers
          .find(m => m._popup.options.location === newHighlight)
        if (newEl) newEl._element.classList.add('highlight')
      }
    },
    mounted () {
      mapboxgl.accessToken = require('../mapboxApiKey.json').key

      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mariko9012/cjh4gkzlw31mc2sqsm3l0g4rk',
        bearing: 0,
        center: [139.905913, 35.712899],
        zoom: 8.34,
        speed: 1.0,
        pitch: 0
      })

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
