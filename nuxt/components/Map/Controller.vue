<template></template>
<script>
export default {
  props: {
    mapboxgl: {
      type: Object,
      required: true,
    },
    map: {
      type: Object,
      required: true,
    },
    clusterer: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      panTimer: null,
      panSpeed: 25,
      defaultPosition: {
        bearing: 0,
        center: [-130, 30],
        zoom: 1.5,
        pitch: 0,
        speed: 2,
      },
    }
  },

  computed: {
    isMobile() {
      return this.$store.state.isMobile
    },
    panMap() {
      return this.$store.state.panMap
    },

    mapPolygons() {
      return this.$store.state.mapPolygons
    },

    // currentView comes in as an array of mapPosition objects.
    currentView() {
      return this.$store.state.currentView
    },

    // this filters us down to unique named places and their location data
    uniqueViewLocations() {
      return this.getUniqueLocations(this.currentView)
    },

    // get a good single point object, zoom and all
    mapPosition() {
      if (!this.currentView || Object.keys(this.currentView).length === 0)
        return this.defaultPosition
      // multiple markers will default to mapZone anyway
      if (!this.currentView[0].location || this.currentView.length > 1)
        return this.currentView[0]
      // otherwise, we have to figure out just how far we need to zoom into not have it fall in a cluster.
      // ...it ain't easy to do that.
      let zoomLevel = 12,
        lastZoomLevel = 0
      const locationName = this.currentView[0].location
      const bounds = [
        this.currentView[0].center[0] - 0.1,
        this.currentView[0].center[1] - 0.1,
        this.currentView[0].center[0] + 0.1,
        this.currentView[0].center[1] + 0.1,
      ]
      while (zoomLevel < 20) {
        lastZoomLevel = zoomLevel
        let clusters, foundIn
        try {
          clusters = this.clusterer.getClusters(bounds, zoomLevel)
        } catch (e) {
          console.log(e)
          continue
        }
        if (clusters) {
          foundIn = clusters.find(marker => {
            return this.getLocationsInMarker(marker).find(
              location => location.toLowerCase() === locationName.toLowerCase()
            )
          })
        }
        if (foundIn) {
          if (this.getLocationsInMarker(foundIn).length === 1) break
          zoomLevel = this.clusterer.getClusterExpansionZoom(foundIn.id)
          if (lastZoomLevel === zoomLevel) zoomLevel++
          continue
        }
        zoomLevel++
        continue
      }

      zoomLevel = Math.max(this.currentView[0].zoom, zoomLevel)

      return {
        ...this.currentView[0],
        zoom: zoomLevel,
      }
    },

    // find the best fit box for our map
    mapZone() {
      if (
        !this.uniqueViewLocations ||
        Object.keys(this.uniqueViewLocations).length <= 1
      )
        return
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
    },
  },

  watch: {
    mapPosition() {
      this.updateMap()
    },

    panMap(shouldPan) {
      this.setPan(shouldPan)
    },
  },

  mounted() {
    this.map.on('mousedown', () => this.setPan(false))
    this.map.on('touchstart', () => this.setPan(false))
    this.map.on('wheel', () => this.setPan(false))
    this.updateMap()
    this.setPan(this.panMap)
  },

  methods: {
    getLocationsInMarker(markerData) {
      const locations = []
      if (markerData.properties.cluster) {
        const getLocationsRecursively = root => {
          if (root.properties.cluster_id)
            this.clusterer
              .getChildren(root.properties.cluster_id)
              .forEach(child => getLocationsRecursively(child))
          else if (root.properties.location)
            locations.push(root.properties.location)
        }
        getLocationsRecursively(markerData)
      } else locations.push(markerData.properties.location)
      return locations
    },

    updateMap() {
      const dest = {}
      for (let key of Object.keys(this.defaultPosition))
        dest[key] = this.mapPosition[key] || this.defaultPosition[key]

      // data can come in from mapZone as an array of 2 points to fit to, or from mapPosition as a mapPosition object.
      if (this.mapZone) {
        // console.log('fitting to', ...this.mapZone)
        const padding = {
          top: this.isMobile ? 20 : 300,
          left: this.isMobile ? 20 : 150,
          right: this.isMobile ? 20 : 150,
          bottom: this.isMobile ? 10 : 150,
        }
        console.log(padding)
        this.map.fitBounds(this.mapZone, {
          padding,
        })
      } else {
        this.map.flyTo(dest)
        // console.log('flying to', dest)
      }
    },

    getUniqueLocations(positionDatas) {
      const uniqueLocations = {}
      for (let positionData of positionDatas) {
        if (!positionData.location) continue
        const location = positionData.location.toLowerCase()
        if (!uniqueLocations[location]) uniqueLocations[location] = []
        uniqueLocations[location].push(positionData)
      }
      return uniqueLocations
    },

    setPan(shouldPan) {
      clearInterval(this.panTimer)
      if (!this.map.isZooming()) this.map.stop()
      if (!shouldPan || !this.map) return

      const duration = 1000
      const panMap = () => {
        if (this.map.isZooming()) return
        this.map.panBy([this.panSpeed, 0], {
          easing: t => t,
          duration: duration,
        })
      }
      panMap()
      this.panTimer = setInterval(panMap, duration)
    },
  },
}
</script>
