const fs = require('fs')
require.extensions['.md'] = function (module, filename) {
	module.exports = fs.readFileSync(filename, 'utf8')
}
const slugify = require('./assets/slugify').slugify
const postDir = './static/posts'
const postFile = './static/posts.json'
const allPostData = fs.readdirSync(postDir)
	.filter(pathName => pathName.indexOf('.') === -1)
	.map(city => {
		const cityDir = postDir + '/' + city
		const cityFile = './static/' + city + '.json'
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

fs.writeFileSync(postFile, JSON.stringify(allPostData), 'utf8')
console.log('Built page reference.')


function getDataForPost(postDir, city, slug) {
	try {
		const postData = require(`${postDir}/${city}/${slug}/data.js`)
		const postContent = require(`${postDir}/${city}/${slug}/content.md`)

		let title = postContent
			.substring(postContent.indexOf('#') + 1)
		
		// create nice truncated description
		const description = title
			.substring(title.indexOf('\n')) // remove title
			.replace(/!\[.*\]\(.*\)/g, '') // remove markdown images
			.replace(/\[([^\]]*)\]\(.*\)/g, (a, b) => b) // remove markdown links
			.replace(/[\n\r]#+/g, '') // remove #, ##, ###, #### headers
			.replace('>', '') // remove > quotes
			.replace('*', '') // remove * bolds
			.replace('\n', ' ') // remove line breaks
			.substring(0, 200) // cut it to 200 chars

		title = title.substring(0, title.indexOf('\n'))

		// create nice usable image path
		let image = postData.image
		if (!image) {
			image = postContent
				.substring(postContent.indexOf('!['))
			image = /!\[.*\]\((.*\.jpe?g|png|gif|webm|tiff)\)/g.exec(image)[1] || ''
				.substring(image.indexOf('(') + 1, image.indexOf(')'))
				.replace('/', '')
		}
		if (image.substring(0, 4) !== 'http') image = `./posts/${city}/${slug}/${image.replace('/', '')}`

		const data = {
			slug,
			city,
			title,
			description,
			image,
			url: `/${city}/${slug}`,
			...postData,
		}
		return data
	} catch (e) { console.log(e) }
}