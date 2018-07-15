import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
	preLoad: 1.3,
	// error: 'dist/error.png',
	loading: '/loading.svg',
	// attempt: 1
})