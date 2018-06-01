const fs = require('fs')

let anyDrafts = false

const resetColor = '\x1b[0m'
const terminalColors = {
	red: '\x1b[31m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	magenta: '\x1b[35m',
	cyan: '\x1b[36m',
	white: '\x1b[37m',
}

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
				console.log(terminalColors.yellow + 'All current drafts:\n' + resetColor)
			}
			console.log(`${terminalColors.yellow}${city}:${resetColor}
	${cityDrafts.join(`
	`)}
	`)
		}
	})

if (!anyDrafts) console.log(terminalColors.yellow + 'No current drafts.\n' + resetColor)
