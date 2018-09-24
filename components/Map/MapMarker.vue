<template></template>
<script>
const allLocations = require('~/static/generated/locations.json')

export default {
  props: {
    mapboxgl: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    clusterer: {
      type: Object,
      required: true
    },
    markerData: {
      type: Object,
      required: true
    },
  },

  data () {
    return {
      marker: null,
      markerElement: null,
    }
  },

  computed: {
    isCluster () { return this.markerData.properties.cluster ? true : false },

    // highlights come in as an array of location names.
		highlight () {
			const newHighlight = this.$store.state.highlight
			if (process.browser) {
				for (let n of newHighlight) {
					if (this.locationsInMarker.find(l =>	l === n))
            return 'highlight'
				}
        
			}
      return ''
		},

    doubleHighlight () {
      const newDoubleHighlight = this.$store.state.doubleHighlight
      for (let n of newDoubleHighlight) {
        if (this.locationsInMarker.find(l =>	l === n))
          return 'doublehighlight'
      }
      return ''
    },

    // returns array of named locations in marker or cluster
    locationsInMarker () {
      const locations = []
      if (this.isCluster) {
        const getLocationsRecursively = (root) => {
          if (root.properties.cluster_id)
            this.clusterer.getChildren(root.properties.cluster_id)
              .forEach(child => getLocationsRecursively(child))
          else if (root.properties.location)
            locations.push(root.properties.location)
        }
        getLocationsRecursively(this.markerData)
      }
      else
        locations.push(this.markerData.properties.location)
      return locations
    },
  },

  watch: {
    highlight () {
      this.updateHighlight()
    },
    doubleHighlight () {
      this.updateHighlight()
    }
  },

  mounted () {
    this.spawnMarker()
    this.updateHighlight()
  },

  beforeDestroy() {
    this.destroyMarker()
  },

  methods: {
    buildMarkerElement () {
      this.markerElement = document.createElement('div')
      this.markerElement.className = (this.isCluster ? 'cluster' : 'marker') + ' ' + this.highlight + ' ' + this.doubleHighlight
      const pinElement = document.createElement('div')
      pinElement.className = 'pin'
      const textBoxElement = document.createElement('div')
      textBoxElement.className = 'text'
      const textElement = document.createTextNode(this.markerData.properties.location || this.markerData.properties.point_count_abbreviated)
      textBoxElement.appendChild(textElement)
      this.markerElement.appendChild(textBoxElement)
      this.markerElement.appendChild(pinElement)
      this.markerElement.addEventListener('click', e => {
        this.$store.commit('setPan', false)
        if (this.isCluster)
          this.zoomIntoCluster()
        else
          this.routeTo(this.markerData.properties.location)
      })
    },
    spawnMarker () {
      if (!this.markerElement)
        this.buildMarkerElement()
      this.marker = new this.mapboxgl.Marker({
          element: this.markerElement,
          anchor: 'bottom',
          offset: [0, 5],
        })
        .setLngLat(this.markerData.geometry.coordinates)
        .addTo(this.map)
    },

    destroyMarker () {
      if (this.marker) this.marker.remove()
    },

    updateHighlight () {
      this.markerElement.classList.remove('highlight')
      this.markerElement.classList.remove('doublehighlight')
      if (this.highlight)
        this.markerElement.classList.add(this.highlight)
      if (this.doubleHighlight)
        this.markerElement.classList.add(this.doubleHighlight)
    },

    routeTo (location) {
      if (allLocations.includes(location.toLowerCase()))
        this.$router.push('/at/' + encodeURI(location).toLowerCase())
    },

    zoomIntoCluster () {
      const children = this.clusterer.getChildren(this.markerData.properties.cluster_id)
      const centerPoint = children
        .map(c => c.geometry.coordinates)
        .reduce((acc, point) => {
          return [acc[0] + (point[0] / children.length), acc[1] + (point[1] / children.length)]
        }, [0,0])
      this.map.flyTo({
        center: centerPoint,
        zoom: this.clusterer.getClusterExpansionZoom(this.markerData.properties.cluster_id) + .8
      })
    },
  }
}
</script>

<style scoped>
</style>