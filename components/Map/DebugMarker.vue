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
		coordinates: {
			type: Array,
			required: true
		}
  },

  data () {
    return {
      marker: null,
      markerElement: null,
    }
  },

  computed: {
  },

  watch: {
  },

  mounted () {
    this.spawnMarker()
  },

  beforeDestroy() {
    this.destroyMarker()
  },

  methods: {
    spawnMarker () {
      this.markerElement = document.createElement('div')
      this.markerElement.className = 'marker'
      const pinElement = document.createElement('div')
      pinElement.className = 'pin'
      const textBoxElement = document.createElement('div')
      textBoxElement.className = 'text'
      const textElement = document.createTextNode('Debug Marker')
      textBoxElement.appendChild(textElement)
      this.markerElement.appendChild(textBoxElement)
      this.markerElement.appendChild(pinElement)
      this.marker = new this.mapboxgl.Marker(this.markerElement)
        .setLngLat(this.coordinates)
        .addTo(this.map)
    },

    destroyMarker () {
      if (this.marker) this.marker.remove()
    },
  }
}
</script>

<style scoped>
</style>