const fs = require('fs')
const { log } = require('../assets/commonFunctions')

const postDir = process.cwd() + '/static/posts'

module.exports = function () {
	let anyDrafts = false
	fs.readdirSync(postDir)
		.filter(pathName => pathName.indexOf('.') === -1)
		.forEach(city => {
			const cityDir = postDir + '/' + city
			const cityDrafts = fs.readdirSync(cityDir)
				.filter(pathName => pathName.indexOf('.') === -1)
				.map(post => {
					const postData = require(`${postDir}/${city}/${post}/data.js`)
					if (!postData.public)
						return post
				})
				.filter(d => d)

			if (cityDrafts.length) {
				if (!anyDrafts) {
					anyDrafts = true
					log('yellow', 'Drafts:')
				}
				log('yellow', '  ', city)
				log('white', '     ・ ' + cityDrafts.join('\n     ・ '))
			}
		})

	if(!anyDrafts) log('green', 'No current drafts.\n')
	else log()
}