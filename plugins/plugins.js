import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
	preLoad: 1.3,
	// error: 'dist/error.png',
	loading: '/images/loading.svg',
	attempt: 1,
	// silent: false,
})