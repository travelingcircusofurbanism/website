const fs = require('fs')
const sharper = require('./sharper')
import { log } from '../../assets/commonFunctions'

const masterPostDir = process.cwd() + '/static/posts/'
const fullSizeDir = 'full/'
const resizedDir = '../generated/resized/'
const loaderDir = '../generated/resized/loader/'

const defaultResizeDimensions = [1200, 500]
const defaultLoaderDimensions = [48, 20]

export default function () {
	return new Promise (resolve => {
		let first = true
		// read all city directories in the master post directory ('tokyo', 'austin', etc)
		fs.readdirSync(masterPostDir)
			.filter(cityDir => cityDir.indexOf('.') === -1)
			.forEach(cityDir => {
				cityDir += '/'
				// read all individual post directories in each city directory
				fs.readdirSync(masterPostDir + cityDir)
					.filter(postDir => postDir.indexOf('.') === -1)
					.forEach(async postDir => {
						postDir += '/'
						// full size images are in /full, resized images are in /generated/resized
						const inputPath = masterPostDir + cityDir + postDir + fullSizeDir
						
						const result = await sharper([
							{
								source: inputPath,
								outputFolder: resizedDir,
								width: defaultResizeDimensions[0],
								height: defaultResizeDimensions[1],
								overwrite: false,
							},
							{
								source: inputPath,
								outputFolder: loaderDir,
								width: defaultLoaderDimensions[0],
								height: defaultLoaderDimensions[1],
								overwrite: false,
							},
						])
						
						if (result.resized.length > 0) {
							if (first) {
								log('cyan', '\nResized:')
								first = false
							}
							log('cyan', '', result.resized.length, `image${ result.resized.length > 1 ? 's' : ''} from`, cityDir + postDir)
						}

					})
			})
			resolve()
	})
}
