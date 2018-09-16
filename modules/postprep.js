const resizeImages = require('./scripts/resizeimages')
const buildListing = require('./scripts/buildlisting')
const listDrafts = require('./scripts/listdrafts')

module.exports = function postprep() {
	// this.nuxt.hook('build:before', upkeep)
	this.nuxt.hook('build:templates', upkeep)
}

const upkeep = (builder) => {
	return new Promise(resolve => {
		buildListing()
			.then(() => {
				listDrafts()
				resizeImages()
				resolve()
			})
	})
}