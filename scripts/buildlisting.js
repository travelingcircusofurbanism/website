const fs = require('fs')

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
const generatedDir = '../static/generated'
if (!fs.existsSync(generatedDir))
	fs.mkdirSync(generatedDir)

const allPostData = fs.readdirSync(postDir)
	.filter(pathName => pathName.indexOf('.') === -1)
	.map(city => {
		const cityDir = postDir + '/' + city
		const cityFile = generatedDir + '/' + city + '.json'
		const cityPostData = fs.readdirSync(cityDir)
			.filter(pathName => pathName.indexOf('.') === -1)
			.map(post => {
				return getDataForPost(postDir, city, post)
			})
			.filter(d => d)
			.sort((a, b) => new Date(a.date) < new Date(b.date))
		fs.writeFileSync(cityFile, JSON.stringify(cityPostData), 'utf8')
		return cityPostData
	})
	.reduce((accumulator, currentValue) => {
			return accumulator.concat(currentValue);
		},[]
	)
	.filter(d => d)
	.sort((a, b) => new Date(a.date) < new Date(b.date))

fs.writeFileSync(generatedDir + '/posts.json', JSON.stringify(allPostData), 'utf8')
console.log(terminalColors.green + 'Generated post lists.\n' + resetColor)


function getDataForPost(postDir, city, slug) {
	try {
		const postData = require(`${postDir}/${city}/${slug}/data.js`)
		const postContent = require(`${postDir}/${city}/${slug}/content.md`)

		if (postData.draft) return

		let title = postContent
			.substring(postContent.indexOf('#') + 1)

		// create nice truncated description
		let description = title
			.substring(title.indexOf('\n')) // remove title
			.replace(/!\[.*\]\(.*\)/g, '') // remove markdown images
			.replace(/\[([^\]]*)\]\(.*\)/g, (a, b) => b) // remove markdown links
			.replace(/<.*>.*<\/.*>/g, '') // remove html tags
			.replace(/[\n\r]#+/g, '') // remove #, ##, ###, #### headers
			.replace('>', '') // remove > quotes
			.replace('*', '') // remove * bolds
			.replace('\n', ' ') // remove line breaks
		if (description.length > 200) {
			const afterLimit = description.substring(200)
			let min = 0
			const nextSpace = [
				afterLimit.indexOf(' '),
				afterLimit.indexOf(','),
				afterLimit.indexOf('.'),
				afterLimit.indexOf('!'),
				afterLimit.indexOf('?'),
				afterLimit.indexOf(';'),
				afterLimit.indexOf(':'),
				afterLimit.indexOf('-'),
			].reduce((min, e) => (e < min && e >= 0) ? e : min) + 200
			description = description.substring(0, nextSpace) + '...'
		}

		title = title.substring(0, title.indexOf('\n'))

		// create nice usable image path
		let image = postData.image
		if (!image) {
			image = /!\[.*\]\((.*\.(?:jpe?g|png|gif|webm|tiff))\)/g.exec(postContent)
			if (!image) {
				console.log(terminalColors.magenta + 'No image found for', city + '/' + slug + ', skipping...' + resetColor)
				image = ''
			}
			else image = image[1]
		}
		if (image.substring(0, 4) !== 'http')
			image = `/posts/${city}/${slug}/resized/${image.replace('/', '')}`

		const data = {
			slug,
			city,
			title,
			description,
			url: `/${city}/${slug}`,
			...postData,
			image,
		}
		return data
	} catch (e) { console.log(e) }
}
