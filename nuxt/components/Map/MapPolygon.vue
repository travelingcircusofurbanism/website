<template></template>
<script>
import polylabel from 'polylabel'
const allLocations = require('~/static/generated/locations.json')

export default {
  props: {
    map: {
      type: Object,
      required: true,
    },
    mapboxgl: {
      type: Object,
      required: true,
    },
    polygonData: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      sourceId: 'source' + `${Math.random()}`.substring(2),
      fillId: 'fill' + `${Math.random()}`.substring(2),
      outlineId: 'outline' + `${Math.random()}`.substring(2),
      labelId: 'label' + `${Math.random()}`.substring(2),
      label: null,
      labelElement: null,
      prevZoneShown: null,
      updateDebounce: null,
      hovering: false,
    }
  },

  computed: {
    isHighlighted() {
      const newHighlight = this.$store.state.highlight
      if (process.browser)
        for (let n of newHighlight)
          if (this.polygonData.location.toLowerCase() === n.toLowerCase())
            return true
      return false
    },
    isDoubleHighlighted() {
      const newHighlight = this.$store.state.doubleHighlight
      if (process.browser)
        for (let n of newHighlight)
          if (this.polygonData.location.toLowerCase() === n.toLowerCase())
            return true
      return false
    },
    geoJSONSource() {
      return {
        type: 'geojson',
        data: this.geoJSONData(),
      }
    },
    geoJSONFill() {
      return {
        id: this.fillId,
        type: 'fill',
        source: this.sourceId,
        paint: {
          'fill-color': [
            'case',
            [
              'any',
              ['to-boolean', ['get', 'doubleHighlight']],
              [
                'all',
                ['to-boolean', ['get', 'hover']],
                ['to-boolean', ['get', 'highlight']],
              ],
            ],
            '#fdb833',
            [
              'any',
              ['to-boolean', ['get', 'highlight']],
              ['to-boolean', ['get', 'hover']],
            ],
            '#00adcc',
            '#fff',
          ],
          'fill-opacity': [
            'case',
            [
              'any',
              ['to-boolean', ['get', 'doubleHighlight']],
              ['to-boolean', ['get', 'highlight']],
            ],
            0.3,
            0.2,
          ],
        },
      }
    },
    geoJSONStroke() {
      return {
        id: this.outlineId,
        type: 'line',
        source: this.sourceId,
        paint: {
          'line-color': [
            'case',
            [
              'any',
              ['to-boolean', ['get', 'doubleHighlight']],
              [
                'all',
                ['to-boolean', ['get', 'hover']],
                ['to-boolean', ['get', 'highlight']],
              ],
            ],
            '#fdb833',
            [
              'any',
              ['to-boolean', ['get', 'highlight']],
              ['to-boolean', ['get', 'hover']],
            ],
            '#00adcc',
            '#ddd',
          ],
          'line-width': [
            'case',
            [
              'any',
              ['to-boolean', ['get', 'doubleHighlight']],
              ['to-boolean', ['get', 'highlight']],
              ['to-boolean', ['get', 'hover']],
            ],
            3,
            1,
          ],
        },
      }
    },
    bounds() {
      return [
        {
          location: 'polygonTopLeft',
          center: [
            Math.min(...this.polygonData.coordinates.map(coord => coord[0])),
            Math.min(...this.polygonData.coordinates.map(coord => coord[1])),
          ],
        },
        {
          location: 'polygonBottomRight',
          center: [
            Math.max(...this.polygonData.coordinates.map(coord => coord[0])),
            Math.max(...this.polygonData.coordinates.map(coord => coord[1])),
          ],
        },
      ]
    },
    labelCoords() {
      return polylabel(this.geoJSONSource.data.geometry.coordinates, 0.01)
    },
    zoomToShow() {
      const averageBoundsDiff =
        (Math.abs(this.bounds[0].center[0] - this.bounds[1].center[0]) +
          Math.abs(this.bounds[0].center[1] - this.bounds[1].center[1])) /
        2
      const boundsMod = Math.sqrt(averageBoundsDiff)
      let zoomToShow = 4 / boundsMod
      if (zoomToShow > 9) zoomToShow = 9
      return parseInt(zoomToShow)
    },
  },

  watch: {
    isHighlighted(highlighted) {
      this.updateHighlights(highlighted, null)
    },
    isDoubleHighlighted(doubleHighlighted) {
      this.updateHighlights(null, doubleHighlighted)
    },
  },

  mounted() {
    this.spawnPolygon()
    this.spawnLabel()
    this.updateHighlights(this.isHighlighted, this.isDoubleHighlighted)
    this.updateZoneShown()
    this.map.on('zoom', this.updateZoneShown)
  },

  beforeDestroy() {
    this.destroyPolygon()
    this.destroyLabel()
  },

  methods: {
    spawnPolygon() {
      this.map.addSource(this.sourceId, this.geoJSONSource)
      this.map.addLayer(this.geoJSONFill)
      this.map.addLayer(this.geoJSONStroke)
      this.map.on('click', this.fillId, this.click)
      this.map.on('click', this.outlineId, this.click)
      this.map.on('mouseenter', this.fillId, this.hover)
      this.map.on('mouseleave', this.fillId, this.unHover)
    },

    destroyPolygon() {
      this.map.removeLayer(this.fillId)
      this.map.removeLayer(this.outlineId)
      this.map.removeSource(this.sourceId)
      this.map.off('click', this.fillId, this.click)
      this.map.off('click', this.outlineId, this.click)
      this.map.off('mouseenter', this.fillId, this.hover)
      this.map.off('mouseleave', this.fillId, this.unHover)
    },

    buildLabelElement() {
      this.labelElement = document.createElement('div')
      this.labelElement.className = 'polygonlabel off'
      this.labelElement.id = this.labelId
      const textElements = []
      textElements.push(document.createTextNode(this.polygonData.location))
      textElements.forEach(el => this.labelElement.appendChild(el))
      this.labelElement.addEventListener('click', this.click)
      this.labelElement.addEventListener('mouseenter', this.hover)
      this.labelElement.addEventListener('mouseleave', this.unHover)
    },

    spawnLabel() {
      if (!this.labelElement) this.buildLabelElement()
      this.label = new this.mapboxgl.Marker({
        element: this.labelElement,
      })
        .setLngLat(this.labelCoords)
        .addTo(this.map)
    },

    destroyLabel() {
      if (this.label) this.label.remove()
    },

    show() {
      this.labelElement.classList.remove('off')
      this.spawnPolygon()
      this.prevZoneShown = true
    },

    hide() {
      this.labelElement.classList.add('off')
      this.destroyPolygon()
      this.prevZoneShown = false
    },

    updateZoneShown() {
      if (this.updateDebounceTimer) return

      const mapBounds = this.map.getBounds()

      // offscreen check
      if (
        this.bounds[0].center[0] > mapBounds._ne.lng ||
        this.bounds[1].center[0] < mapBounds._sw.lng ||
        this.bounds[0].center[1] > mapBounds._ne.lat ||
        this.bounds[1].center[1] < mapBounds._sw.lat
      ) {
        return this.prevZoneShown ? this.hide() : null
      }

      const zoneShown =
        this.isHighlighted ||
        this.isDoubleHighlighted ||
        parseInt(this.map.getZoom()) >= this.zoomToShow
      if (zoneShown === this.prevZoneShown) return

      if (zoneShown) this.show()
      else this.hide()

      this.updateDebounceTimer = setTimeout(() => {
        this.updateDebounceTimer = false
      }, 400)
    },

    updateHighlights(highlighted, doubleHighlighted, skipLayers) {
      if (highlighted) this.labelElement.classList.add('highlight')
      else if (highlighted !== null)
        this.labelElement.classList.remove('highlight')

      if (doubleHighlighted) this.labelElement.classList.add('doublehighlight')
      else if (doubleHighlighted !== null)
        this.labelElement.classList.remove('doublehighlight')

      this.$nextTick(() => {
        if (this.prevZoneShown)
          this.map.getSource(this.sourceId).setData(this.geoJSONData())
      })
    },

    click(e) {
      try {
        e.preventDefault()
        e.stopPropagation()
      } catch (e) {}
      const location = this.polygonData.location.toLowerCase()
      if (allLocations.includes(location))
        this.$router.push('/at/' + encodeURI(location))
      // this.$nextTick(() => this.$store.commit('setView', this.bounds))
    },

    hover(e) {
      this.hovering = true
      this.map.getSource(this.sourceId).setData(this.geoJSONData())
      this.map.getCanvas().style.cursor = 'pointer'
      this.labelElement.classList.add('hover')
      this.show()
    },

    unHover(e) {
      this.hovering = false
      this.map.getSource(this.sourceId).setData(this.geoJSONData())
      this.map.getCanvas().style.cursor = ''
      this.labelElement.classList.remove('hover')
      this.$nextTick(this.updateZoneShown)
    },

    geoJSONData() {
      return {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [this.polygonData.coordinates],
        },
        properties: {
          highlight: this.isHighlighted,
          doubleHighlight: this.isDoubleHighlighted,
          hover: this.hovering,
        },
      }
    },
  },
}
</script>

<style scoped></style>
