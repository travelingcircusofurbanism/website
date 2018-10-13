<template></template>
<script>
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
  },

  data () {
    return {
      limitCalculateEvent: null,
    }
  },

  computed: {
		// generates GeoJSON point data from unique locations
		uniqueMarkerLocationsAsGeoJSONObjects () {
			return this.markerLocationsToGeoJSONObjects(
				this.getUniqueLocations(
					this.$store.state.mapMarkers
				)
			)
		},

		// cityLocationsAsGeoJSONObjects () {
		// 	return this.markerLocationsToGeoJSONObjects(
		// 		this.getCityLocations(
		// 			this.$store.state.mapMarkers
		// 		)
		// 	)
		// },
  },

	watch: {
		uniqueMarkerLocationsAsGeoJSONObjects (newGeoJSON) {
			this.clusterer.load(newGeoJSON)
		},
	},

	mounted () {
		this.map.on('zoom', () => {
			if (!this.limitCalculateEvent)
				this.limitCalculateEvent = setTimeout(() => {
					this.calculateClusters()
					this.limitCalculateEvent = null
				}, 200)
		})
		this.map.on('move', () => {
			if (!this.limitCalculateEvent)
				this.limitCalculateEvent = setTimeout(() => {
					this.calculateClusters()
					this.limitCalculateEvent = null
				}, 200)
		})
		this.clusterer.load(this.uniqueMarkerLocationsAsGeoJSONObjects)
		this.calculateClusters()
	},

  methods: {
		getUniqueLocations (markers) {
			const uniqueLocations = {}
			for (let marker of markers) {
				if (!marker.location) continue
				const location = marker.location.toLowerCase()
				if (!uniqueLocations[location])
					uniqueLocations[location] = []
				uniqueLocations[location].push(marker)
			}
			return uniqueLocations
		},

		getCityLocations (markers) {
			const cityLocations = {}
			for (let marker of markers) {
				if (marker.location || !marker.city) continue
				const location = marker.city.toLowerCase()
				if (!cityLocations[location])
					cityLocations[location] = []
				cityLocations[location].push(marker)
			}
			return cityLocations
		},

		calculateClusters () {
			if (!this.map || !document) return
			let bounds = this.map.getBounds().toArray()
			const xDiff = Math.abs(bounds[0][0] - bounds[1][0])
			const yDiff = Math.abs(bounds[0][1] - bounds[1][1])
			const markerSpawnOffsetAsExtraPercentOfScreen = .5
			let xMod = xDiff * markerSpawnOffsetAsExtraPercentOfScreen
			let yMod = yDiff * markerSpawnOffsetAsExtraPercentOfScreen
			bounds = [
				bounds[0][0] - xMod,
				bounds[0][1] - yMod,
				bounds[1][0] + xMod,
				bounds[1][1] + yMod
			]
			const clusters = this.clusterer.getClusters(
				bounds,
				Math.round(this.map.getZoom())
			)
			const clustersWithExtraData = clusters.map(marker => ({
				...marker,
				locations: this.getLocationsInMarker(marker),
				expansionZoom: this.clusterer.getClusterExpansionZoom(marker.id)
			}))
			this.$emit('updateMarkers', clustersWithExtraData)
		},

		getLocationsInMarker (markerData) {
      const locations = []
      if (markerData.properties.cluster) {
        const getLocationsRecursively = (root) => {
          if (root.properties.cluster_id)
            this.clusterer.getChildren(root.properties.cluster_id)
              .forEach(child => getLocationsRecursively(child))
          else if (root.properties.location)
            locations.push(root.properties.location)
        }
        getLocationsRecursively(markerData)
      }
      else
        locations.push(markerData.properties.location)
      return locations
    },

		markerLocationsToGeoJSONObjects (locations) {
			if (!locations) return []
			const markerData = []
			for (let marker of Object.values(locations)) {
				markerData.push({
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
		}
	}
}
</script>