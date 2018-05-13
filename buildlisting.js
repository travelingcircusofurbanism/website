const fs = require('fs')
const slugify = require('./assets/slugify').slugify
const postDir = './static/posts'
const postFile = './static/posts.json'
const allPostData = fs.readdirSync(postDir)
	.filter(pathName => pathName.indexOf('.') === -1)
	.map(slug => {
		try {
			const postData = require(`${postDir}/${slug}/data.js`)
			const data = {
				slug,
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
