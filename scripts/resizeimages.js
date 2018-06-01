const fs = require('fs')
const sharp = require('sharp')
const masterPostDir = '../static/posts/'

const defaultHeight = 500

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
											console.log(terminalColors.cyan + 'Scaled and saved' + resetColor, outputPath + file)
										})
								}
							}
						}
					})
				})
			})
	})

