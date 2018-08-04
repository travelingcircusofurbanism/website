<template>
  <div>
    <img
      src="/loading.svg"
      class="loader"
      :class="{off: styleReady}"
    />
    <div id="map" :class="{ready: styleReady}">
    </div>
    <div class="hidden">This exists to make sure that the highlight variables update. Silly, I know. {{ doubleHighlight + ' ' + highlight }}</div>
  </div>
</template>

<script>

  import supercluster from 'supercluster'
  const ak = require('../../mapboxApiKey.json').key
  const allLocations = require('~/static/generated/locations.json')

  const defaultPosition = {
    bearing: 0,
    center: [-130, 30],
    zoom: 1.5,
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
          radius: 50,
        }),
        limitZoomEvent: null,
        panTimer: null,
        panSpeed: 25,
      }
    },

    computed: {
      // mapMarkers and currentView come in as an array of mapPosition objects.
      mapMarkers () { return this.$store.state.mapMarkers },
      currentView () { return this.$store.state.currentView },

      // highlight comes in as an array of location names.
      highlight () {
        const newHighlight = this.$store.state.highlight
        if (process.browser) {
          [].forEach.call(document.querySelectorAll('.highlight'), el =>
            el.classList.remove('highlight')
          )
          for (let n of newHighlight) {
            const newEl = this.currentMarkers
              .find(m =>
                m._popup.options.location === n ||
                m._popup.options.locations.find(l => l === n)
              )
            if (newEl) newEl._element.classList.add('highlight')
          }
        }
        return newHighlight
      },

      // doubleHighlight comes in as a string.
      doubleHighlight () {
        const newHighlight = this.$store.state.doubleHighlight
        if (process.browser) {
          [].forEach.call(document.querySelectorAll('.doublehighlight'), el =>
            el.classList.remove('doublehighlight')
          )
          for (let n of newHighlight) {
            const newEl = this.currentMarkers
              .find(m =>
                m._popup.options.location === n ||
                m._popup.options.locations.find(l => l === n)
              )
            if (newEl) newEl._element.classList.add('doublehighlight')
          }
        }
        return newHighlight
      },

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
        // TODO is this even necessary these days?
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
        let top = -90,
            right = -180,
            bottom = 90,
            left = 180
        for (let marker of Object.values(this.uniqueViewLocations)) {
          const c = marker[0].center
          if (c[1] > top) top = c[1] // max y
          if (c[0] > right) right = c[0] // max x
          if (c[1] < bottom) bottom = c[1] // min y
          if (c[0] < left) left = c[0] // min x
        }

        // check for very zoomed out view (homepage), and focus on fitting y values instead.
        // this is to stop the map from zooming out so far that it shows antarctica, etc.
        const xDifference = Math.abs(right - left)
        if (xDifference > 100) {
          const randomMarkerXValue = Object.values(this.uniqueViewLocations)[
              Math.floor(
                Math.random() * Object.values(this.uniqueViewLocations).length
              )
            ][0].center[0]
          right = randomMarkerXValue + 1
          left = randomMarkerXValue - 1
        }

        return [[left, bottom], [right, top]]
      }
    },

    watch: {
      mapPosition () {
        this.tryUpdateMap()
      },

      panMap (shouldPan) {
        this.setPan(shouldPan)
      },

      uniqueMarkerLocationsAsGeoJSONObjects (newGeoJSON) {
        this.clusterer.load(newGeoJSON.features)
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

        if (!this.map) {
          this.initializeMap(dest)
          // console.log('initializing at', dest)
        }
        // data can come in from mapZone as an array of 2 points to fit to, or from mapPosition as a mapPosition object.
        else if (this.mapZone) {
          // console.log('fitting to', ...this.mapZone)
          const padding = {
            top: this.isMobile ? 50 : 300,
            left: this.isMobile ? 60 : 150,
            right: this.isMobile ? 60 : 150,
            bottom: this.isMobile ? 40 : 150,
          }
          this.map.fitBounds(this.mapZone, {
            padding,
          })
        }
        else {
          this.map.flyTo(dest)
          // console.log('flying to', dest)
        }
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

        this.map.on('mousedown', () => this.setPan(false))
        this.map.on('touchstart', () => this.setPan(false))
        this.map.on('wheel', () => this.setPan(false))

        this.clusterer.load(this.uniqueMarkerLocationsAsGeoJSONObjects.features)
        this.calculateClusters()
      },

      calculateClusters () {
        if (!this.map || !document) return
        const cZone = this.mapZone ?
          [ this.mapZone[0][0], this.mapZone[0][1], this.mapZone[1][0], this.mapZone[1][1] ] :
          [ this.mapPosition.center[0] - 1, this.mapPosition.center[1] - 1, this.mapPosition.center[0] + 1, this.mapPosition.center[1] + 1 ]
        this.currentClusters = this.clusterer.getClusters(
          // cZone,
          [-180, -85, 180, 85],
          Math.round(this.map.getZoom())
        )
        this.createDisplayedMarkerElements()
      },

      createDisplayedMarkerElements () {
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
            const shouldHighlight = this.highlight
              .find(nameToHighlight =>
                marker.properties.location === nameToHighlight ||
                locations.find(l => l === nameToHighlight)
              ) ? true : false

            // create a HTML marker for each feature
            const markerElement = document.createElement('div')
            markerElement.className = (isCluster ? 'cluster' : 'marker') + ' ' +
              (shouldHighlight ? 'highlight' : '')
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
                  zoom: this.clusterer.getClusterExpansionZoom(marker.properties.cluster_id) + .8
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
        if (!this.map.isZooming()) this.map.stop()
        if (!shouldPan || !this.map) return

        const duration = 1000
        const panMap = () => {
          if (this.map.isZooming()) return
          this.map.panBy([this.panSpeed, 0], {
              easing: t => t,
              duration: duration
          })
        }
        panMap()
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
    height: 100vh;
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

  .mapbox-ctrl-attrib, .mapboxgl-missing-css, .mapboxgl-control-container {
    display: none;
  }
</style>
