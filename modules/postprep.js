const resizeImages = require('./scripts/resizeimages')
const buildListing = require('./scripts/buildlisting')
const listDrafts = require('./scripts/listdrafts')
const transformMarkdown = require('./scripts/transformmarkdown')

const timeBetweenUpkeeps = 2000
let timer

module.exports = function () {
	this.nuxt.hook('build:templates', upkeep)
}

const upkeep = () => {
	if (timer) return
	timer = setTimeout(() => timer = null, timeBetweenUpkeeps)
	return new Promise(resolve => {
		transformMarkdown()
		buildListing()
			.then(() => {
				listDrafts()
				resizeImages()
				resolve()
			})
	})
}