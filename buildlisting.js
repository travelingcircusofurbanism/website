const fs = require('fs')
require.extensions['.md'] = function (module, filename) {
	module.exports = fs.readFileSync(filename, 'utf8')
}
const slugify = require('./assets/slugify').slugify
const postDir = './static/posts'
const postFile = './static/posts.json'
const allPostData = fs.readdirSync(postDir)
	.filter(pathName => pathName.indexOf('.') === -1)
	.map(slug => {
		try {
			const postData = require(`${postDir}/${slug}/data.js`)
			const postContent = require(`${postDir}/${slug}/content.md`)
			let title = postContent
				.substring(postContent.indexOf('#') + 1)
			const description = title
				.substring(title.indexOf('\n'))
				.replace('#', '')
				.replace('\n', ' ')
				.substring(0, 200)
			title = title.substring(0, title.indexOf('\n'))
			let image = postContent
				.substring(postContent.indexOf('!['))
			image = image.substring(image.indexOf('(') + 1, image.indexOf(')'))
			const data = {
				slug,
				title,
				description,
				image,
				url: `/${slug}`,
				...postData,
			}
			return data
		} catch (e) { console.log(e) }
	})
	.filter(d => d)
	.sort((a, b) => new Date(a.date) < new Date(b.date))

fs.writeFileSync(postFile, JSON.stringify(allPostData), 'utf8')
console.log('Built page reference.')
