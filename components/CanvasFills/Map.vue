<template>
  <div>
    <img
      src="/loading.svg"
      class="loader"
      :class="{off: styleReady}"
    />
    <div id="map" :class="{ready: styleReady}">
    </div>
  </div>
</template>

<script>

  import supercluster from 'supercluster'
  const ak = require('../../mapboxApiKey.json').key
  const allLocations = require('~/static/generated/locations.json')

  const defaultPosition = {
    bearing: 0,
    center: [180, 0],
    zoom: 3.00,
    pitch: 0,
    speed: 2,
  }

  export default {
    data () {
      return {
        mapboxgl: null,
        map: null,
        currentMarkers: [],
        currentClusters: [],
        componentReady: false,
        styleReady: false,
        clusterer: supercluster({
          radius: 45,
        }),
        limitZoomEvent: null,
        panTimer: null,
      }
    },

    computed: {
      // mapMarkers and currentView come in as an array of mapPosition objects.
      mapMarkers () { return this.$store.state.mapMarkers },
      currentView () { return this.$store.state.currentView },

      // highlight comes in as an array of location names.
      highlight () { return this.$store.state.highlight },

      panMap () { return this.$store.state.panMap },

      isMobile () { return this.$store.state.isMobile },

      // filters us down to unique named places
      uniqueMarkerLocations () { return getUniqueLocations(this.mapMarkers) },

      uniqueViewLocations () { return getUniqueLocations(this.currentView) },

      // generates point data from unique locations
      uniqueMarkerLocationsAsGeoJSONObjects () {
        if (!this.uniqueMarkerLocations) return []
        const markerData = {
          type: 'FeatureCollection',
          features: []
        }
        for (let marker of Object.values(this.uniqueMarkerLocations)) {
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

      // get a good starting point for our map
      mapPosition () {
        if (!this.currentView || Object.keys(this.currentView).length === 0) {
          this.$emit('close')
          return defaultPosition
        }
        this.$emit('open')
        return this.currentView[0]
      },

      // if there are multiple points, find the best fit box
      mapZone () {
        if (!this.uniqueViewLocations || Object.keys(this.uniqueViewLocations).length <= 1) return
        
        const minMax = [[180, 180], [-180, -180]]
        for (let marker of Object.values(this.uniqueViewLocations)) {
          const c = marker[0].center
          if (c[0] < minMax[0][0]) minMax[0][0] = c[0] // min x
          if (c[1] < minMax[0][1]) minMax[0][1] = c[1] // min y
          if (c[0] > minMax[1][0]) minMax[1][0] = c[0] // max x
          if (c[1] > minMax[1][1]) minMax[1][1] = c[1] // max y
        }
        const xDiff = Math.abs((minMax[1][0] + 180) - (minMax[0][0] + 180)),
              yDiff = Math.abs((minMax[1][1] + 180) - (minMax[0][1] + 180)),
              distanceFromBoxEdge = 0.7,
              xOffset = xDiff * distanceFromBoxEdge,
              yOffset = yDiff * distanceFromBoxEdge
        
        minMax[0][0] -= xOffset // offset min x
        minMax[0][1] -= yOffset // offset min y
        minMax[1][0] += xOffset // offset max x
        minMax[1][1] += yOffset * 1.1 // offset max y

        if (minMax[1][1] > 90) {
          const diff = minMax[1][1] - 90
          minMax[1][1] = 90
          minMax[0][1] -= diff
          if (minMax[0][1] < -90) minMax[0][1] = -90
        }
        
        return minMax
      }
    },

    watch: {
      mapPosition () {
        this.tryUpdateMap()
      },

      panMap (shouldPan) {
        this.setPan(shouldPan)
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
      },
    },

    mounted () {
      this.componentReady = true
      this.mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')
      if (document) this.tryUpdateMap()
    },

    methods: {
      tryUpdateMap () {
        if (!this.componentReady || !this.mapPosition || !this.uniqueMarkerLocationsAsGeoJSONObjects)
          return setTimeout(() => this.tryUpdateMap(), 200)

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

      initializeMap (dest) {
        this.mapboxgl.accessToken = ak
        this.map = new this.mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mariko9012/cjh4gkzlw31mc2sqsm3l0g4rk?optimize=true',
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
      },

      calculateClusters () {
        if (!this.map || !document) return
        this.clusterer.load(this.uniqueMarkerLocationsAsGeoJSONObjects.features)
        const cZone = this.mapZone ?
          [ this.mapZone[0][0], this.mapZone[0][1], this.mapZone[1][0], this.mapZone[1][1] ] :
          [ this.mapPosition.center[0] - 1, this.mapPosition.center[1] - 1, this.mapPosition.center[0] + 1, this.mapPosition.center[1] + 1 ]
        this.currentClusters = this.clusterer.getClusters(
          // cZone,
          [-180, -85, 180, 85],
          Math.round(this.map.getZoom())
        )
        this.calculateDisplayedMarkerElements()
      },

      calculateDisplayedMarkerElements () {
        if (!this.componentReady || !this.map || !document )
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
            const popup = new this.mapboxgl.Popup({
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
              this.setPan(false)
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
            const newMarker = new this.mapboxgl.Marker(markerElement)
              .setPopup(popup)
              .setLngLat(marker.geometry.coordinates)
              .addTo(this.map)

            this.currentMarkers.push(newMarker)
          })
      },

      setPan (shouldPan) {
        clearInterval(this.panTimer)
        if (!shouldPan || !this.map || this.isMobile) return
        const duration = 1000
        const panMap = () => {
          if (this.map.isZooming()) return
          this.map.panBy([12, 0], {
              easing: t => t,
              duration: duration
          })
        }
        this.panTimer = setInterval(panMap, duration)
      },

    }
  }

  function getUniqueLocations (markers) {
    const uniqueLocations = {}
    for (let marker of markers) {
      if (!marker.location) continue
      const location = marker.location.toLowerCase()
      if (!uniqueLocations[location])
        uniqueLocations[location] = []
      uniqueLocations[location].push(marker)
    }
    return uniqueLocations
  }

</script>

<style lang="scss" scoped>

  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 1s;
    
    &.off {
      opacity: 0;
    }
  }

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

  .mapbox-ctrl-attrib {
    display: none;
  }
</style>
