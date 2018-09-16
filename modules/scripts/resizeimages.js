const fs = require('fs')
const sharp = require('sharp')
const { log } = require('../../assets/commonFunctions')

const masterPostDir = process.cwd() + '/static/posts/'
const fullSizeDir = 'full/'
const resizedDir = 'resized/'

const defaultHeight = 500
const maxWidth = 1200

module.exports = function () {
	return new Promise (resolve => {
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
						// full size images are in /full, resized images are in /resized
						const inputPath = masterPostDir + cityDir + postDir + fullSizeDir
						const outputPath = masterPostDir + cityDir + postDir + resizedDir
						if (!fs.existsSync(outputPath))
							fs.mkdirSync(outputPath)
						if (!fs.existsSync(inputPath))
							fs.mkdirSync(inputPath)

						// look for existing resized images in the post directory
						fs.readdir(masterPostDir + cityDir + postDir + resizedDir, (err, files) => {
							if (err) return console.log(err)
							const existingImages = []
							for (let file of files) {
								if (/(.jpe?g|.png)$/g.test(file)) {
									existingImages.push(file)
								}
							}

							// look through all full size images
							fs.readdir(inputPath, (err, files) => {
								if (err) {
									if (err.code !== 'ENOENT') return console.log(err)
									else return
								}
								files.forEach(file => {
									if (/(.jpe?g|.png)$/g.test(file)) {
										// if image already exists, skip it
										if (!existingImages.find(f => f === file)) {
											// otherwise, resize it and put it in the post directory
											sharp(inputPath + file)
												.resize(maxWidth, defaultHeight)
												.max()
												.toFile(outputPath + file)
												.then(function () {
													log('cyan', 'Resized and saved', cityDir + postDir + fullSizeDir + file)
												})
												.catch(e => {
													log('magenta', 'Our image processor had some trouble resizing the file at', inputPath + file + '. The full error details are:')
													console.log(e)
													log('magenta', `Take a look at that image and make sure it's a valid jpeg, jpg, or png file. Regardless, we've skipped this image for now.`)
												})
										}
									}
									// if the file isn't an image we can resize, just toss it in /resized anyway. (skips folders)
									else if (file.indexOf('.') > 0) {
										fs.copyFile(inputPath + file, outputPath + file, e => {
											if (e) {
												log('magenta', `For some reason, we couldn't copy`, inputPath + file ,`from /full to /resized. Here are the error details:`)
												console.log(e)
												return log('magenta', 'Skipping this file for now.')
											}
											log('cyan', 'Copied (non-jpg/png file)', cityDir + postDir + fullSizeDir + file)
										})
									}
								})
							})
						})
					})
			})
			resolve()
	})
}
