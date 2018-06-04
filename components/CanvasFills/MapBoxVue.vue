<template>
  <mgl-map
    id="map"
    :accessToken="accessToken"
    :mapStyle.sync="mapStyle"
    :zoom="zoom"
    :center="center"
  >
    <mgl-geojson-layer
      v-for="layer, key in layers"
      :key="key"
      :source.sync="layer"
      :layerId="`${id}`"
    />

    <mgl-marker :coordinates="[0, 0]" />

  </mgl-map>
</template>

<script>
import { MglMap, MglGeojsonLayer, MglMarker } from 'vue-mapbox'

export default {
  components: {
    MglMap,
    MglGeojsonLayer,
    MglMarker,
  },
  data() {
    return {
      id: 'cjhei3c7b0qu52wmrmh5o6xbu',
      accessToken: require('../../mapboxApiKey.json').key,
      mapStyle: 'mapbox://styles/mariko9012/cjh4gkzlw31mc2sqsm3l0g4rk',

      zoom: 5,
      center: [0, 0],

      layers: [
        {
          "type": "FeatureCollection",
          "features": [{
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -76.53063297271729,
                      39.18174077994108
                  ]
              }
          }]
        }
      ],
      pageMarkers: []
    }
  }
}

/*
  export default {
    data () {
      return {
        map: null,
        currentMarkers: [],
        ready: false
      }
    },
    computed: {
      mapMarkers () { return this.$store.state.mapMarkers },
      highlight () { return this.$store.state.highlightedLocation },

      uniqueLocations () {
        const uniqueLocations = {}
        for (let marker of this.mapMarkers) {
          const location = marker.locationName ? marker.locationName.toLowerCase() : ''
          if (!uniqueLocations[location])
            uniqueLocations[location] = []
          uniqueLocations[location].push(marker)
        }
        return uniqueLocations
      },

      markerData () {
        if (!this.uniqueLocations) return
        const markerData = {
          type: 'FeatureCollection',
          features: []
        }
        for (let marker of Object.values(this.uniqueLocations)) {
          if (!marker[0].locationName) continue
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
        if (!this.uniqueLocations || Object.keys(this.uniqueLocations).length === 0) return

        // if only one point, use that.
        if (this.mapMarkers.length === 1) return this.mapMarkers[0].position

        // if there are multiple points, take their average and zoom out a little
        let x = 0, y = 0, z = 0
        const uniqueAsArr = Object.values(this.uniqueLocations)
        const length = uniqueAsArr.length
        for (let m of uniqueAsArr) {
          x += m[0].position.center[0]
          y += m[0].position.center[1]
          z += m[0].position.zoom
        }
        const position = {...uniqueAsArr[0][0].position}
        position.center = [
          x / length,
          y / length
        ]
        position.zoom = (z / length) - 1

        return position
      },
    },
    watch: {

      mapPosition (newPosition) {
        this.tryUpdateMap(newPosition)
      },

      markerData (newMarkers) {
        if (!newMarkers) return
        this.currentMarkers.forEach(marker => {
          marker.remove()
        })
        this.currentMarkers = []
        this.markerData.features
          .sort((a, b) => a.geometry.coordinates[1] < b.geometry.coordinates[1])
          .forEach(marker => {

            const popup = new mapboxgl.Popup({
              offset: 20,
              closeButton: false,
              location: marker.properties.locationName,
            })

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
            markerElement.addEventListener('click', e => this.routeTo(marker.properties.locationName))

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
      this.ready = true
      mapboxgl.accessToken = require('../mapboxApiKey.json').key
      this.tryUpdateMap(this.mapPosition)
    },
    methods: {
      tryUpdateMap (newPosition) {
        if (!this.ready)
          return setTimeout(this.tryUpdateMap, 200)
        const dest = newPosition ||
          {
            bearing: 0,
            center: [180, 0],
            zoom: 1.00,
            pitch: 0
          }
        if (!this.map) {
          this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mariko9012/cjh4gkzlw31mc2sqsm3l0g4rk',
            ...dest
          })
          // this.map.once('styledata', () => console.log('LOADED'))
        }
        else 
          this.map.flyTo(dest)
      },
      routeTo (location) {
        this.$router.push('/at/' + location.replace(' ', '%20'))
      }
    }
  }
*/
</script>

<style lang="scss" scoped>
  #map {
    height: 120vh;
    top: -10vh;
  }
</style>
