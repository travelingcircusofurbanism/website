<template>
  <div id="map" :class="{ready: styleReady}">
  </div>
</template>

<script>
  const mapboxgl = require('mapbox-gl')
  import supercluster from 'supercluster'
  const apiKey = require('../../mapboxApiKey.json').key
  const allLocations = require('~/static/generated/locations.json')

  const defaultPosition = {
      bearing: 0,
      center: [180, 0],
      zoom: 1.00,
      pitch: 0,
      speed: 1,
    }

  export default {
    data () {
      return {
        map: null,
        currentMarkers: [],
        currentClusters: [],
        componentReady: false,
        styleReady: false,
        clusterer: supercluster(),
        limitZoomEvent: null,
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
        if (!this.uniqueLocations) return []
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

      // get a good starting point for our map, or return the single point to look for
      mapPosition () {
        if (!this.uniqueLocations || Object.keys(this.uniqueLocations).length === 0) return defaultPosition

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

      // if there are multiple points, find the best fit box
      mapZone () {
        if (!this.uniqueLocations || Object.keys(this.uniqueLocations).length === 0) return
        if (Object.keys(this.uniqueLocations).length > 1) {
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
                offsetMod = 0.75,
                xOffset = xDiff * offsetMod,
                yOffset = yDiff * offsetMod
          
          minMax[0][0] -= xOffset // offset min x
          minMax[0][1] -= yOffset // offset min y
          minMax[1][0] += xOffset // offset max x
          minMax[1][1] += yOffset * 1.5 // offset max y

          if (minMax[1][1] > 90) {
            const diff = minMax[1][1] - 90
            minMax[1][1] = 90
            minMax[0][1] -= diff
            if (minMax[0][1] < -90) minMax[0][1] = -90
          }
          
          return minMax
        }
      }
    },
    watch: {

      mapPosition (newPosition) {
        this.tryUpdateMap(newPosition)
      },

      markerData (newMarkers, oldMarkers) {
        if (!newMarkers || newMarkers == oldMarkers) return
        // add new data to clusterer
        this.clusterer.load(this.markerData.features)
        this.calculateClusters()
      },

      highlight (newHighlight, oldHighlight) {
        for (let o of oldHighlight) {
          const oldEl = this.currentMarkers
            .find(m => 
              m._popup.options.location === o ||
              m._popup.options.locations.find(l => l === o)
            )
          if (oldEl) oldEl._element.classList.remove('highlight')
        }
        for (let n of newHighlight) {
          const newEl = this.currentMarkers
            .find(m =>
              m._popup.options.location === n ||
              m._popup.options.locations.find(l => l === n)
            )
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
        if (!this.componentReady || !mapboxgl || !this.mapPosition || !this.markerData) {
          return setTimeout(() => this.tryUpdateMap(), 200)
        }

        // add new data to clusterer
        this.clusterer.load(this.markerData.features)

        mapboxgl.accessToken = apiKey
        const dest = {}
        for (let key of Object.keys(defaultPosition))
          dest[key] = this.mapPosition[key] || defaultPosition[key]
          
        if (!this.map)
          this.initializeMap(dest)
        
        // data can come in from mapZone as an array of 2 points to fit to, or from mapPosition as a mapPosition object.
        if (this.mapZone)
          this.map.fitBounds(this.mapZone)
        else
          this.map.flyTo(dest)
      },

      routeTo (location) {
        if (allLocations.includes(location.toLowerCase()))
          this.$router.push('/at/' + location.toLowerCase().replace(' ', '%20'))
      },

      calculateDisplayedMarkerElements () {
        if (!this.componentReady || !mapboxgl || !this.map)
          return
        this.currentMarkers.forEach(marker => {
          marker.remove()
        })
        this.currentMarkers = []
        this.currentClusters
          .sort((a, b) => a.geometry.coordinates[1] < b.geometry.coordinates[1])
          .forEach(marker => {
            const isCluster = marker.properties.cluster

            const locations = []
            if (isCluster) {
              const getLocationsRecursively = (root) => {
                if (root.properties.cluster_id)
                  this.clusterer.getChildren(root.properties.cluster_id)
                    .forEach(child => getLocationsRecursively(child))
                else if (root.properties.location)
                  locations.push(root.properties.location)
              }
              getLocationsRecursively(marker)
            }
            const popup = new mapboxgl.Popup({
              location: marker.properties.location,
              locations,
            })

            // create a HTML marker for each feature
            const markerElement = document.createElement('div')
            markerElement.className = isCluster ? 'cluster' : 'marker'
            const pin = document.createElement('div')
            pin.className = 'pin'
            const textBox = document.createElement('div')
            textBox.className = 'text'
            const text = document.createTextNode(marker.properties.location || marker.properties.point_count_abbreviated)
            textBox.appendChild(text)
            markerElement.appendChild(textBox)
            markerElement.appendChild(pin)
            markerElement.addEventListener('click', e => {
              if (isCluster) {
                const children = this.clusterer.getChildren(marker.properties.cluster_id)
                const centerPoint = children
                  .map(c => c.geometry.coordinates)
                  .reduce((acc, point) => {
                    return [acc[0] + (point[0] / children.length), acc[1] + (point[1] / children.length)]
                  }, [0,0])
                this.map.flyTo({
                  center: centerPoint,
                  zoom: this.clusterer.getClusterExpansionZoom(marker.properties.cluster_id) + 1
                })
              }
              else
                this.routeTo(marker.properties.location)
            })

            // make a marker for each feature and add to the map
            const newMarker = new mapboxgl.Marker(markerElement)
              .setPopup(popup)
              .setLngLat(marker.geometry.coordinates)
              .addTo(this.map)

            this.currentMarkers.push(newMarker)
          })
      },

      calculateClusters () {
        const cZone = this.mapZone ?
          [ this.mapZone[0][0], this.mapZone[0][1], this.mapZone[1][0], this.mapZone[1][1] ] :
          [ this.mapPosition.center[0] - 1, this.mapPosition.center[1] - 1, this.mapPosition.center[0] + 1, this.mapPosition.center[1] + 1 ]
        this.currentClusters = this.clusterer.getClusters(
          cZone,
          Math.round(this.map.getZoom())
        )
        this.calculateDisplayedMarkerElements()
      },

      initializeMap (dest) {
        this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mariko9012/cjh4gkzlw31mc2sqsm3l0g4rk',
          ...dest
        })
        this.map.on('styledata', () =>
          setTimeout(() => this.styleReady = true, 300)
        )
        this.map.on('zoom', () => {
          if (!this.limitZoomEvent)
            this.limitZoomEvent = setTimeout(() => {
              this.calculateClusters()
              this.limitZoomEvent = null
            }, 300)
        })
        this.calculateClusters()
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

    @include width (mobile) {
      height: 100% !important;
      top: 0;
    }
  }
</style>
