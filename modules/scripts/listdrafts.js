const fs = require('fs')
const { log } = require('../../assets/commonFunctions')

const postDir = process.cwd() + '/static/posts'

module.exports = function () {
	return new Promise (resolve => {
		try {
			const postListPromises = fs.readdirSync(postDir)
				.filter(pathName => pathName.indexOf('.') === -1)
				.map(city => {
					const cityDir = postDir + '/' + city
					return getFileListAsync ( cityDir )
				})

				Promise.all(postListPromises)
					.then(postLists => {
						let drafts = postLists
							.map(list => {
								return list.filter(pathName => pathName.indexOf('.') === -1)
									.map(post => {
										const postData = require(`${post}/data.js`)
										if (!postData.public)
											return post
									})
									.filter(d => d)
							})
						drafts = [].concat.apply([], drafts)
						if (drafts.length) {
							log('yellow', ' Drafts:')
							let lastCity = ''
							drafts.forEach(d => {
								const [path, city, title] = /.*\/([\w\d ]+)\/([\w\d ]+)$/gi.exec(d)
								if (city !== lastCity) {
									lastCity = city
									log('yellow', '  ', city)
								}
								log('white', '     ・ ' + title)
							})
						}
						else log('green', 'No current drafts.')
						log() //line break
						resolve(drafts)
					})
		} catch (e) { resolve() }
	})
}

function getFileListAsync ( dir ) {
	return new Promise((resolve, reject) => {
		fs.readdir(dir, (err, filenames) => {
			if (err) reject(err)
			else resolve(filenames.map(f => dir + '/' + f))
		});
	});
}