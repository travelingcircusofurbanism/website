const fs = require('fs')
const sharp = require('sharp')
const postDir = './static/posts/'

const defaultHeight = 500

const allPostData = fs.readdirSync(postDir)
	.filter(postPath => postPath.indexOf('.') === -1)
	.forEach(postPath => {
		postPath += '/'
		fs.readdir(postDir + postPath, (err, files) => {
			if (err) return console.log(err)
			const existingImages = []
			for (let file of files) {
				if (/(.jpg|.png)$/g.test(file)) {
					existingImages.push(file)
				}
			}
			const inputPath = postDir + postPath + 'full/'
			const outputPath = postDir + postPath
			fs.readdir(inputPath, (err, files) => {
				if (err) {
					if (err.code !== 'ENOENT') return console.log(err)
					else return
				}
				for (let file of files) {
					if (/(.jpg|.png)$/g.test(file)) {
						if (!existingImages.find(f => f === file)) {
							sharp(inputPath + file)
								.resize(null, defaultHeight)
								.toFile(outputPath + file)
								.then(function () {
									console.log('Scaled and saved', outputPath + file)
								})
						}
					}
				}
			})
		})
	})

