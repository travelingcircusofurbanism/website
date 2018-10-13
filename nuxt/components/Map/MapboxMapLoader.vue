<template>
  <div>
    <LoaderIcon :active="!styleReady" />
    <div id="map" :class="{ready: styleReady}">
    </div>
		<template v-if="styleReady">
      <slot
				:mapboxgl="mapboxgl"
        :map="map"
				:clusterer="clusterer"
      />
    </template>
  </div>
</template>

<script>
import LoaderIcon from '~/components/LoaderIcon'
import supercluster from 'supercluster'

export default {
	props: [
		'apikey', 
		'defaultPosition',
    'mapboxStyle',
	],

  components: { LoaderIcon, },

	data () {
		return {
			mapboxgl: null,
			map: null,
			clusterer: supercluster({
        radius: 60,
        maxZoom: 15,
      }),
			styleReady: false,
		}
	},

	mounted () {
		if (!document) return
		this.mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')
		this.mapboxgl.accessToken = this.apikey
		this.map = new this.mapboxgl.Map({
			container: 'map',
			style: this.mapboxStyle,
			...this.defaultPosition
		})

		this.map.on('styledata', () =>
			setTimeout(() => this.styleReady = true, 300)
		)
	},

  methods: {
  },

}

</script>

<style lang="scss" scoped>
@import '~/assets/variables.scss';

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
