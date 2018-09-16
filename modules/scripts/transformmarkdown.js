const fs = require('fs')
const { log } = require('../assets/commonFunctions')

const masterPostDir = process.cwd() + '/static/posts/'

module.exports = function () {
	// read all city directories in the master post directory ('tokyo', 'austin', etc)
	fs.readdirSync(masterPostDir)
		.filter(cityDir => cityDir.indexOf('.') === -1)
		.forEach(cityDir => {
			cityDir += '/'
			// read all individual post directories in each city directory
			fs.readdirSync(masterPostDir + cityDir)
				.filter(postDir => postDir.indexOf('.') === -1)
				.forEach(postDir => {
					log('white', 'Generated HTML from MD for ' + postDir)
				})
		})
}

function formatMarkdown (baseMD) {
	if (!baseMD) return ''
	let newMD = baseMD
	newMD = fixImages(newMD)
	newMD = fixLinks(newMD)
	newMD = fixVideos(newMD)
	return newMD
}

function fixImages (baseMD) {
	let newMD = baseMD
	// fix internal images
	const localImageElementRegex = /<img src=\"(?!http|www\.)\/?(?:(?:[^\/,"]+\/)*)(.+)\.(jpe?g|png|gif|webm|svg)" ?(?:alt(?:="(.*)")?)?/gim
	let matches = localImageElementRegex.exec(baseMD)
	while (matches != null) {
		const srcImagePath = encodeURI(`${this.path}resized/${matches[1]}.${matches[2]}`)
		const fullSizeImagePath = encodeURI(`https://www.travelingcircusofurbanism.com${this.path}full/${matches[1]}.${matches[2]}`)
		const description = (matches[3] || '').replace('"', '\'')
		const postPath = encodeURI(`https://www.travelingcircusofurbanism.com${this.url}`)
		const imageTagToSwapIn = `
          <img 
            data-src="${ srcImagePath}"
            ${ description ?
				`alt="${description}"
              data-pin-description="${ description}"`
				: ''
			}
            data-pin-url="${ postPath}"
            data-pin-media="${ fullSizeImagePath}"`
		newMD = newMD.replace(matches[0], imageTagToSwapIn)
		matches = localImageElementRegex.exec(baseMD)
	}
	// fix external images
	const externalImageElementRegex = /<img src="((?:http|www\.).*(?:jpe?g|png|gif|webm|svg))" ?(?:alt(?:="(.*)")?)?/gim
	matches = externalImageElementRegex.exec(baseMD)
	while (matches != null) {
		const srcImagePath = matches[1]
		const description = (matches[2] || '').replace('"', '\'')
		const postPath = encodeURI(`https://www.travelingcircusofurbanism.com${this.url}`)
		const imageTagToSwapIn = `
          <img 
            data-src="${ srcImagePath}"
            ${ description ?
				`alt="${description}"
              data-pin-description="${ description}"`
				: ''
			}
            data-pin-url="${ postPath}"
            data-pin-media="${ srcImagePath}"`
		console.log(imageTagToSwapIn)
		newMD = newMD.replace(matches[0], imageTagToSwapIn)
		matches = externalImageElementRegex.exec(baseMD)
	}
	return newMD
}

function fixImages (baseMD) {
	// make external links open in new tab
	return newMD.replace(/<a href="([^"]*)">/g,
		(match, url) => {
			const externalAttributes = url.indexOf('travelingcircusofurbanism.com') === -1 ?
				'target="_blank" class="external"' : ''
			return `<a ${externalAttributes} href="${url}">`
		}
	)
}

function fixVideos (baseMD) {
	// add wrapper to videos
	return newMD.replace(/(<iframe.*<\/iframe>)/g,
		(match, iframe) => `<div class="video-wrapper">${iframe}</div>`
	)
}