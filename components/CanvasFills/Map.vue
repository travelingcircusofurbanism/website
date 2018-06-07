<template>
  <div id="map" :class="{ready: styleReady}">
  </div>
</template>

<script>
  const apiKey = require('../../mapboxApiKey.json').key

  export default {
    data () {
      return {
        map: null,
        currentMarkers: [],
        componentReady: false,
        styleReady: false,
      }
    },
    computed: {
      // mapMarkers comes in as an array of mapPosition objects.
      mapMarkers () { return this.$store.state.mapMarkers },

      // highlight comes in as an array of location names.
      highlight () { return this.$store.state.highlight },

      uniqueLocations () {
        const uniqueLocations = {}
        for (let marker of this.mapMarkers) {
          if (!marker.location) continue
          const location = marker.location.toLowerCase()
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
          markerData.features.push({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: marker[0].center
            },
            properties: {
              location: marker[0].location
            }
          })
        }
        return markerData
      },

      mapPosition () {
        if (!this.uniqueLocations || Object.keys(this.uniqueLocations).length === 0) return

        // if only one point, use that.
        if (this.mapMarkers.length === 1)
          return this.mapMarkers[0]

        // otherwise, find a nice average center spot
        let x = 0, y = 0, z = 0
        const uniqueAsArr = Object.values(this.uniqueLocations)
        const length = uniqueAsArr.length
        for (let m of uniqueAsArr) {
          x += m[0].center[0]
          y += m[0].center[1]
          z += m[0].zoom
        }
        const position = {...uniqueAsArr[0][0]}
        position.center = [
          x / length,
          y / length
        ]
        position.zoom = (z / length) - 1

        return position
      },

      mapZone () {
        if (!this.uniqueLocations || Object.keys(this.uniqueLocations).length === 0) return
        if (Object.keys(this.uniqueLocations).length > 1) {
          // if there are multiple points, find the best fit box
          const minMax = [[180, 180], [-180, -180]]
          for (let marker of Object.values(this.uniqueLocations)) {
            const c = marker[0].center
            if (c[0] < minMax[0][0]) minMax[0][0] = c[0] // min x
            if (c[1] < minMax[0][1]) minMax[0][1] = c[1] // min y
            if (c[0] > minMax[1][0]) minMax[1][0] = c[0] // max x
            if (c[1] > minMax[1][1]) minMax[1][1] = c[1] // max y
          }
          const xDiff = Math.abs((minMax[1][0] + 180) - (minMax[0][0] + 180)),
                yDiff = Math.abs((minMax[1][1] + 180) - (minMax[0][1] + 180)),
                offsetMod = 0.8,
                xOffset = xDiff * offsetMod,
                yOffset = yDiff * offsetMod
          
          minMax[0][0] -= xOffset // offset min x
          minMax[0][1] -= yOffset // offset min y
          minMax[1][0] += xOffset // offset max x
          minMax[1][1] += yOffset // offset max y
          
          return minMax
        }
      }
    },
    watch: {

      mapPosition (newPosition) {
        this.tryUpdateMap(newPosition)
      },

      markerData (newMarkers) {
        if (!newMarkers) return
        this.recalculateMarkerData()
      },

      highlight (newHighlight, oldHighlight) {
        for (let o of oldHighlight) {
          const oldEl = this.currentMarkers
            .find(m => m._popup.options.location === o)
          if (oldEl) oldEl._element.classList.remove('highlight')
        }
        for (let n of newHighlight) {
          const newEl = this.currentMarkers
            .find(m => m._popup.options.location === n)
          if (newEl) newEl._element.classList.add('highlight')
        }
      }
    },
    mounted () {
      this.componentReady = true
      this.tryUpdateMap()
    },
    methods: {
      tryUpdateMap () {
        if (!this.componentReady || !window.mapboxgl || !this.mapPosition) {
          return setTimeout(() => this.tryUpdateMap(), 200)
        }

        mapboxgl.accessToken = apiKey
        const dest = this.mapPosition ||
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
          this.map.on('styledata', () => 
            setTimeout(() => this.styleReady = true, 300)
          )
          this.recalculateMarkerData()
        }
        // data can come in from mapZone as an array of 2 points to fit to, or from mapPosition as a mapPosition object.
        if (this.mapZone)
          this.map.fitBounds(this.mapZone)
        else
          this.map.flyTo(dest)
      },

      routeTo (location) {
        this.$router.push('/at/' + location.replace(' ', '%20'))
      },

      recalculateMarkerData () {
        if (!this.componentReady || !window.mapboxgl || !this.map)
          return
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
              location: marker.properties.location,
            })

            // create a HTML marker for each feature
            const markerElement = document.createElement('div')
            markerElement.className = 'marker'
            const pin = document.createElement('div')
            pin.className = 'pin'
            const textBox = document.createElement('div')
            textBox.className = 'text'
            const text = document.createTextNode(marker.properties.location)
            textBox.appendChild(text)
            markerElement.appendChild(textBox)
            markerElement.appendChild(pin)
            markerElement.addEventListener('click', e => this.routeTo(marker.properties.location))

            // make a marker for each feature and add to the map
            const newMarker = new mapboxgl.Marker(markerElement)
              .setLngLat(marker.geometry.coordinates)
              .setPopup(popup)
              .addTo(this.map)

            this.currentMarkers.push(newMarker)
          })
        }
    }
  }

</script>

<style lang="scss" scoped>
  #map {
    height: 120vh !important;
    top: -10vh;
    opacity: 0;
    transition: opacity 3s;

    &.ready {
      opacity: 1;
    }
  }
</style>
