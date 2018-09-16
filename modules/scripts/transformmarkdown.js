const fs = require('fs')
const { log } = require('../../assets/commonFunctions')
const md = require('markdown-it')({
	html: true,
	linkify: true,
	breaks: true,
	typographer: false,
})

const masterPostDir = process.cwd() + '/static/posts/'
const generatedSubDir = '/generated'
const htmlSubDir = '/html'

module.exports = function () {
	log('green', ' Generating HTML from Markdown.')
	// read all city directories in the master post directory ('tokyo', 'austin', etc)
	fs.readdirSync(masterPostDir)
		.filter(cityDir => cityDir.indexOf('.') === -1)
		.forEach(cityDir => {
			// read all individual post directories in each city directory
			fs.readdirSync(masterPostDir + cityDir)
				.filter(postDir => postDir.indexOf('.') === -1)
				.forEach(postDir => {
					const markdownPaths = [
						masterPostDir + cityDir + '/' + postDir + '/content.md',
						masterPostDir + cityDir + '/'  + postDir + '/ja.md',
					]
					createDir(masterPostDir + cityDir + '/'  + postDir + generatedSubDir)
					createOrWipeDir(masterPostDir + cityDir + '/' + postDir + generatedSubDir + htmlSubDir)

					// grab english content for RSS
					fs.readFile(markdownPaths[0], 'utf8', (err, markdown) => {
						if (err) return
						const generatedRSSHTML = formatMarkdownToRSSHTML(markdown, cityDir, postDir)
						if (!generatedRSSHTML) return
						const rssFileName = '/rssContent.html'
						fs.writeFile(masterPostDir + cityDir + '/' + postDir + generatedSubDir + htmlSubDir + rssFileName, generatedRSSHTML, (err) => {})
					})
						
					markdownPaths.forEach(markdownPath => {
						fs.readFile(markdownPath, 'utf8', (err, markdown) => {
							if (err) return

							const generatedHTML = formatMarkdownToSiteHTML(markdown, cityDir, postDir)
							if (!generatedHTML) return
							const fileName = markdownPath.substring(markdownPath.lastIndexOf('/'), markdownPath.lastIndexOf('.')) + '.html'
							fs.writeFile(masterPostDir + cityDir + '/' + postDir + generatedSubDir + htmlSubDir + fileName, generatedHTML, (err) => {})
						})
					})
				})
		})
}

function formatMarkdownToSiteHTML (baseMD, city, post) {
	if (!baseMD) return
	let generatedHTML = md.render(baseMD)
	generatedHTML = fixImages(generatedHTML, city, post)
	generatedHTML = fixLinks(generatedHTML)
	generatedHTML = fixVideos(generatedHTML)
	generatedHTML = removeExcessSpaces(generatedHTML)
	return generatedHTML
}

function formatMarkdownToRSSHTML(baseMD, city, post) {
	if (!baseMD) return
	let generatedHTML = md.render(baseMD)
	generatedHTML = fixImagesForRSS(generatedHTML, city, post)
	generatedHTML = removeExcessSpaces(generatedHTML)
	return generatedHTML
}

function fixImages (baseHTML, city, post) {
	let newHTML = baseHTML
	// fix internal images
	const localImageElementRegex = /<img src=\"(?!http|www\.)\/?(?:(?:[^\/,"]+\/)*)(.+)\.(jpe?g|png|gif|webm|svg)" alt="([^>"]*)">/gim
	let matches = localImageElementRegex.exec(baseHTML)
	while (matches != null) {
		const srcImagePath = encodeURI(`/posts/${city}/${post}/generated/resized/${matches[1]}.${matches[2]}`)
		const fullSizeImagePath = encodeURI(`https://www.travelingcircusofurbanism.com/posts/${city}/${post}/full/${matches[1]}.${matches[2]}`)
		const description = (matches[3] || '').replace(/<.*>/g, '').replace('"', '\'')
		const postPath = encodeURI(`https://www.travelingcircusofurbanism.com/${city}/${post}`)
		const imageTagToSwapIn = `
          <img 
            data-src="${ srcImagePath }" ${ description ?
							`alt="${description}"
              data-pin-description="${ description }"`
							: ''
						}
            data-pin-url="${ postPath }"
            data-pin-media="${ fullSizeImagePath }">`
		newHTML = newHTML.replace(matches[0], imageTagToSwapIn)
		matches = localImageElementRegex.exec(baseHTML)
	}
	// fix external images
	const externalImageElementRegex = /<img src="((?:http|www\.).*(?:jpe?g|png|gif|webm|svg))" alt="([^>"]*)">/gim
	matches = externalImageElementRegex.exec(baseHTML)
	while (matches != null) {
		const srcImagePath = matches[1]
		const description = (matches[2] || '').replace(/<.*>/g, '').replace('"', '\'')
		const postPath = encodeURI(`https://www.travelingcircusofurbanism.com/${city}/${post}`)
		const imageTagToSwapIn = `
          <img 
            data-src="${ srcImagePath }" ${ description ?
							`alt="${description }"
              data-pin-description="${ description }"`
							: ''
						}
            data-pin-url="${ postPath}"
            data-pin-media="${ srcImagePath}">`
		newHTML = newHTML.replace(matches[0], imageTagToSwapIn)
		matches = externalImageElementRegex.exec(baseHTML)
	}
	return newHTML
}

function fixLinks (baseHTML) {
	// make external links open in new tab
	return baseHTML.replace(/<a href="([^"]*)">/g,
		(match, url) => {
			const externalAttributes = url.indexOf('travelingcircusofurbanism.com') === -1 ?
				'target="_blank" class="external"' : ''
			return `<a ${externalAttributes} href="${url}">`
		}
	)
}

function fixVideos (baseHTML) {
	// add wrapper to videos
	return baseHTML.replace(/<iframe.*<\/iframe>/g,
		iframe => `<div class="video-wrapper">${iframe}</div>`
	)
}

function removeExcessSpaces (baseHTML) {
	return baseHTML.replace(/  /g, '')
		.replace(/\n\n/g, '')
}

function fixImagesForRSS (baseHTML, city, post) {
	let newHTML = baseHTML
	const localImageElementRegex = /<img src=\"(?!http|www\.)\/?(?:(?:[^\/,"]+\/)*)(.+)\.(jpe?g|png|gif|webm|svg)" alt="([^>"]*)">/gim
	let matches = localImageElementRegex.exec(baseHTML)
	while (matches != null) {
		const srcImagePath = encodeURI(`https://www.travelingcircusofurbanism.com/posts/${city}/${post}/generated/resized/${matches[1]}.${matches[2]}`)
		const description = (matches[3] || '').replace(/<.*>/g, '').replace('"', '\'')
		const imageTagToSwapIn = `<img alt="${ description }" src="${ srcImagePath }">`
		newHTML = newHTML.replace(matches[0], imageTagToSwapIn)
		matches = localImageElementRegex.exec(baseHTML)
	}
	return newHTML
}

function createDir (dir) {
	if (!fs.existsSync(dir))
		fs.mkdirSync(dir)
}

function createOrWipeDir (dir) {
	createDir(dir)
	fs.readdirSync(dir)
		.forEach(file => {
			fs.unlinkSync(dir + '/' + file)
		})
}

function wipeAndDeleteDir(dir) {
	fs.readdirSync(dir)
		.forEach(file => {
			fs.unlinkSync(dir + '/' + file)
		})
	fs.rmdirSync(dir)
}