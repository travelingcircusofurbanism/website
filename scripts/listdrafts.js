const fs = require('fs')

let anyDrafts = false

require.extensions['.md'] = function (module, filename) {
	module.exports = fs.readFileSync(filename, 'utf8')
}
const postDir = '../static/posts'
const allPostData = fs.readdirSync(postDir)
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
				console.log('All current drafts:\n')
			}
			console.log(`${city}:
	${cityDrafts.join(`
	`)}
	`)
		}
	})

if (!anyDrafts) console.log('No current drafts.\n')
