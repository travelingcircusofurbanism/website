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
					if (postData.draft)
						return post
				})
				.filter(d => d)

			if (cityDrafts.length) {
				if (!anyDrafts) {
					anyDrafts = true
					log('yellow', 'Current drafts:\n')
				}
				log('yellow', `${city}:
	${cityDrafts.join(`
	`)}
	`)
			}
		})

	if(!anyDrafts) log('green', 'No current drafts.\n')
}