<template></template>
<script>
const allLocations = require('~/static/generated/locations.json')

// TODO click zooms in too far on mobile for clusters

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
    markerData: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      marker: null,
      markerElement: null,
      canvasElement: null,
    }
  },

  computed: {
    isCluster() {
      return this.markerData.properties.cluster ? true : false
    },
    isMobile() {
      return this.$store.state.isMobile
    },

    // highlights come in as an array of location names.
    highlight() {
      const newHighlight = this.$store.state.highlight
      if (process.browser) {
        for (let n of newHighlight) {
          if (
            this.locationsInMarker.find(
              l => l.toLowerCase() === n.toLowerCase()
            )
          )
            return 'highlight'
        }
      }
      return ''
    },

    doubleHighlight() {
      const newDoubleHighlight = this.$store.state.doubleHighlight
      for (let n of newDoubleHighlight) {
        if (
          this.locationsInMarker.find(l => l.toLowerCase() === n.toLowerCase())
        )
          return 'doublehighlight'
      }
      return ''
    },

    // returns array of named locations in marker or cluster
    locationsInMarker() {
      const locations = []
      if (this.isCluster && this.map && this.mapboxgl) {
        const getLocationsRecursively = root => {
          if (root.properties.cluster_id)
            this.clusterer
              .getChildren(root.properties.cluster_id)
              .forEach(child => getLocationsRecursively(child))
          else if (root.properties.location)
            locations.push(root.properties.location)
        }
        getLocationsRecursively(this.markerData)
      } else locations.push(this.markerData.properties.location)
      return locations
    },
  },

  watch: {
    highlight() {
      this.updateHighlight()
    },
    doubleHighlight() {
      this.updateHighlight()
    },
  },

  mounted() {
    this.canvasElement = document.getElementById('canvas')
    this.spawnMarker()
    this.updateHighlight()
  },

  beforeDestroy() {
    this.destroyMarker()
  },

  methods: {
    buildMarkerElement() {
      this.markerElement = document.createElement('div')
      this.markerElement.className =
        (this.isCluster ? 'cluster' : 'marker') +
        ' ' +
        this.highlight +
        ' ' +
        this.doubleHighlight
      const pinElement = document.createElement('div')
      pinElement.className = 'pin'
      const textBoxElement = document.createElement('div')
      textBoxElement.className = 'text'
      const textElements = []
      if (this.isCluster) {
        const points = this.markerData.properties.point_count_abbreviated
        const minPoints = 2
        const maxPoints = 20
        const maxDiameter = 60
        const intensity = 2
        const diameter =
          ((((points - minPoints) / (maxPoints - minPoints) <= 1
            ? (points - minPoints) / (maxPoints - minPoints)
            : 1) +
            intensity) /
            (intensity + 1)) *
          maxDiameter
        pinElement.style.cssText = `width: ${diameter}px; height: ${diameter}px;`
        pinElement.innerHTML = `<span>${points}</span>`
        textElements.push(document.createTextNode(points))
      } else {
        const lines = this.softSplitStringEveryXCharacters(
          this.markerData.properties.location,
          8
        )
        lines.forEach(string => {
          const newDiv = document.createElement('div')
          newDiv.appendChild(document.createTextNode(string))
          textElements.push(newDiv)
        })
      }
      textElements.forEach(el => textBoxElement.appendChild(el))
      this.markerElement.appendChild(textBoxElement)
      this.markerElement.appendChild(pinElement)
      this.markerElement.addEventListener('click', e => {
        this.$store.commit('setPan', false)
        if (this.isCluster) this.zoomIntoCluster()
        else this.routeTo(this.markerData.properties.location)
      })
    },
    spawnMarker() {
      if (!this.markerElement) this.buildMarkerElement()
      this.marker = new this.mapboxgl.Marker({
        element: this.markerElement,
        anchor: 'bottom',
        offset: [0, 5],
      })
        .setLngLat(this.markerData.geometry.coordinates)
        .addTo(this.map)
    },

    destroyMarker() {
      if (this.marker) this.marker.remove()
    },

    updateHighlight() {
      this.markerElement.classList.remove('highlight')
      this.markerElement.classList.remove('doublehighlight')
      if (this.highlight) this.markerElement.classList.add(this.highlight)
      if (this.doubleHighlight)
        this.markerElement.classList.add(this.doubleHighlight)
    },

    routeTo(location) {
      if (allLocations.includes(location.toLowerCase()))
        this.$router.push('/at/' + encodeURIComponent(location).toLowerCase())
    },

    zoomIntoCluster() {
      let children = this.clusterer.getChildren(
        this.markerData.properties.cluster_id
      )
      while (children.length < 2) {
        // weed out any single cluster responses
        children = this.clusterer.getChildren(children[0].properties.cluster_id)
      }
      let top = -90,
        right = -180,
        bottom = 90,
        left = 180
      children
        .map(c => c.geometry.coordinates)
        .forEach(c => {
          if (c[1] > top) top = c[1] // max y
          if (c[0] > right) right = c[0] // max x
          if (c[1] < bottom) bottom = c[1] // min y
          if (c[0] < left) left = c[0] // min x
        })
      const newBounds = [[left, bottom], [right, top]]
      // const centerPoint = children
      //   .map(c => c.geometry.coordinates)
      //   .reduce(
      //     (acc, point) => {
      //       return [
      //         acc[0] + point[0] / children.length,
      //         acc[1] + point[1] / children.length,
      //       ]
      //     },
      //     [0, 0]
      // )
      // centerPoint doesn't adjust to dodge the header!! this was cauting weird mobile stuff i bet
      // this.map.flyTo({
      //   center: centerPoint,
      //   zoom:
      //     this.clusterer.getClusterExpansionZoom(
      //       this.markerData.properties.cluster_id
      //     ) + (this.isMobile ? 0.8 : 1.2),
      // })
      const mapWidth = this.canvasElement.offsetWidth
      const mapHeight = this.canvasElement.offsetHeight
      const padding = {
        top: mapHeight * 0.35, //this.isMobile ? 120 : 340,
        left: mapWidth * 0.3, //this.isMobile ? 80 : 140,
        right: mapWidth * 0.3, //this.isMobile ? 80 : 140,
        bottom: mapHeight * 0.2, //this.isMobile ? 80 : 180,
      }
      this.map.fitBounds(newBounds, {
        padding,
      })
    },

    softSplitStringEveryXCharacters(string, characterCount) {
      let newStrings = []
      let prevCutoff = 0,
        currCutoff = 0
      while (currCutoff <= string.length) {
        if (
          (string.charAt(currCutoff) === ' ' &&
            currCutoff - prevCutoff >= characterCount) ||
          currCutoff === string.length
        ) {
          newStrings.push(string.substring(prevCutoff, currCutoff))
          prevCutoff = currCutoff + 1
        }
        currCutoff++
      }
      return newStrings
    },
  },
}
</script>
