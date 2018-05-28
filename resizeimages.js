const fs = require('fs')
const sharp = require('sharp')
const masterPostDir = './static/posts/'

const defaultHeight = 500

// read all city directories in the master post directory ('tokyo', 'austin', etc)
fs.readdirSync(masterPostDir)
	.filter(cityDir => cityDir.indexOf('.') === -1)
	.forEach(cityDir => {
		cityDir += '/'
		// read all individual post directories in each city directory
		fs.readdirSync(masterPostDir + cityDir)
			.filter(postDir => postDir.indexOf('.') === -1)
			.forEach(postDir => {
				postDir += '/'
				// look for existing images in the post directory
				fs.readdir(masterPostDir + cityDir + postDir, (err, files) => {
					if (err) return console.log(err)
					const existingImages = []
					for (let file of files) {
						if (/(.jpe?g|.png)$/g.test(file)) {
							existingImages.push(file)
						}
					}
					// full size images are in /full, resized images are in /
					const inputPath = masterPostDir + cityDir + postDir + 'full/'
					const outputPath = masterPostDir + cityDir + postDir
					// look through all full size images
					fs.readdir(inputPath, (err, files) => {
						if (err) {
							if (err.code !== 'ENOENT') return console.log(err)
							else return
						}
						for (let file of files) {
							if (/(.jpe?g|.png)$/g.test(file)) {
								// if image already exists, skip it
								if (!existingImages.find(f => f === file)) {
									// otherwise, resize it and put it in the post directory
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
	})

