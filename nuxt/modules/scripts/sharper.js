const sharp = require('sharp')
const sharpOptions = {
  withoutEnlargement: true,
  fit: sharp.fit.inside,
}
const fs = require('fs')
const path = require('path')
let prompt
const calledFromCommandLine = require.main === module

const status = console.log
const err = console.log

const DEFAULT_SOURCE = './'
const DEFAULT_OUTPUT_FOLDER = 'resized'

const promptSettings = {
  properties: {
    source: {
      required: true,
      default: DEFAULT_SOURCE,
    },
    outputFolder: {
      required: false,
      default: DEFAULT_OUTPUT_FOLDER,
    },
    width: {
      pattern: /^\d*$/,
      message: 'Must be an integer',
      type: 'integer',
      required: false,
    },
    height: {
      pattern: /^\d*$/,
      message: 'Must be an integer',
      type: 'integer',
      required: false,
    },
  },
}

if (calledFromCommandLine) {
  prompt = require('prompt')
  prompt.start()
  runPrompt()
}

function runPrompt() {
  prompt.get(promptSettings, async (err, enteredOptions) => {
    if (err) return err(err)
    await resizeProgrammatically(enteredOptions)
    runPrompt()
  })
}

function initializeResize(options) {
  return new Promise(async resolve => {
    let results
    if (Array.isArray(options)) {
      const promises = options.map(async o => await resizeProgrammatically(o))
      results = await Promise.all(promises)
      results.forEach((r, index) => {
        if (index === 0) return
        Object.keys(r).forEach(key => {
          if (Array.isArray(r[key])) results[0][key].push(...r[key])
          else if (Number.isInteger(r[key])) results[0][key] += r[key]
        })
      })
      results = results[0]
    } else results = await resizeProgrammatically(options)
    resolve(results)
    // could add watching here later, etc
  })
}

function resizeProgrammatically(options) {
  return new Promise(async resolve => {
    options = checkOptions(options)
    if (options.err) {
      err(options.err)
      return resolve(options)
    }

    const messages = []
    const source = []
    const resized = []
    let success, fail, skipped

    if (isImage(options.source) || isFolder(options.source)) {
      let detailsOfImagesToResize = []
      let detailsOfOutputFolderImages

      if (isImage(options.source)) {
        const parsedImagePath = /(.*\/)?([^/]+\.(?:jpe?g|png))$/gim.exec(
          options.source
        )
        detailsOfImagesToResize.push({
          sourceImage: path.resolve(parsedImagePath[0]),
          sourceDir: path.resolve(parsedImagePath[1] || '.'),
          fileName: parsedImagePath[2],
        })
        if (!options.overwrite)
          detailsOfOutputFolderImages = await getDataOfImageFilesInFolder(
            path.resolve(parsedImagePath[1] || '.', options.outputFolder)
          )
      } else {
        const sourceDetails = await getDataOfImageFilesInFolder(options.source)
        // need to check for returned error here
        detailsOfImagesToResize.push(...sourceDetails)
        if (!options.overwrite)
          detailsOfOutputFolderImages = await getDataOfImageFilesInFolder(
            path.resolve(options.source, options.outputFolder)
          )
      }

      skipped = detailsOfImagesToResize.length
      if (!options.overwrite) {
        // need to check for returned error here
        detailsOfImagesToResize = removeDuplicateFiles(
          detailsOfImagesToResize,
          detailsOfOutputFolderImages
        )
      }

      const resizedImageDetails = await resizeArrayOfImages(
        detailsOfImagesToResize,
        { ...options }
      )
      success = resizedImageDetails.length
      fail = detailsOfImagesToResize.length - success
      skipped = skipped - success - fail

      messages.push('Resized images:')
      for (let details of resizedImageDetails) {
        source.push(details.source)
        resized.push(details.output)
        messages.push(`   ${details.fileName}`)
      }
      if (resizedImageDetails.length === 0) {
        messages.pop()
      } else
        messages.push(
          `to ${path.resolve(options.source, options.outputFolder)}`
        )
    } else {
      messages.push('Invalid path or image type.')
      resolve({ err: 'Invalid path or image type' })
    }

    if (messages.length > 0 && calledFromCommandLine) {
      console.log('')
      for (let message of messages) status(message)
      console.log('')
    }

    resolve({ source, resized, success, fail, skipped })
  })
}

function checkOptions(options) {
  options.width = parseInt(options.width)
  options.height = parseInt(options.height)
  if (isNaN(options.width)) delete options.width
  if (isNaN(options.height)) delete options.height

  if (options.overwrite !== true && options.overwrite !== false)
    options.overwrite = false

  options.source = (options.source || DEFAULT_SOURCE).replace(/\s+$/g, '')
  options.outputFolder = (
    options.outputFolder || DEFAULT_OUTPUT_FOLDER
  ).replace(/^\//g, '')

  if (!options.width && !options.height)
    return { err: 'Must specify at least one valid dimension' }
  if (options.width <= 0 || options.height <= 0)
    return { err: 'Invalid width or height value.' }
  if (options.source.length === 0) options.source = './'

  return options
}

function resizeArrayOfImages(fileInfo, options) {
  return new Promise(async resolve => {
    const resizePromises = fileInfo.map(
      async info =>
        await resizeImage({
          ...options,
          fileName: info.fileName,
          sourceImage: info.sourceImage,
          sourceDir: info.sourceDir,
        })
    )

    Promise.all(resizePromises).then(fileInfo => resolve(fileInfo))
  })
}

async function resizeImage({
  sourceImage,
  sourceDir,
  fileName,
  width,
  height,
  outputFolder,
}) {
  const outputFolderFullPath = path.resolve(sourceDir, outputFolder)
  const outputImageFullPath = outputFolderFullPath + '/' + fileName

  await createFolder(outputFolderFullPath)

  return sharp(sourceImage)
    .resize(width, height, sharpOptions)
    .toFile(outputImageFullPath)
    .then(() => {
      return {
        source: path.resolve(sourceImage),
        fileName,
        output: outputImageFullPath,
      }
    })
    .catch(e => err(e))
}

function createFolder(path) {
  return new Promise(resolve => {
    fs.access(path, err => {
      if (err && err.code !== 'EEXIST') {
        fs.mkdir(path, () => {
          resolve()
        })
      } else resolve()
    })
  })
}

function getFilesInFolder(path) {
  return new Promise(resolve => {
    fs.readdir(path, (e, files) => {
      if (e) {
        try {
          fs.mkdirSync(path)
        } catch (e) {}
        resolve([])
      } else resolve(files)
    })
  })
}

async function getFilesInFolderAndCreatePathIfNecessary(path) {
  const parts = path.split('/').filter(p => p)
  let currPath = '',
    files
  for (let pathEl of parts) {
    currPath += '/' + pathEl
    files = await getFilesInFolder(currPath)
  }
  return files
}

function getDataOfImageFilesInFolder(sourceDir) {
  return new Promise(async resolve => {
    if (!/.*\/$/g.exec(sourceDir)) sourceDir += '/'

    let files = await getFilesInFolderAndCreatePathIfNecessary(sourceDir)
    if (!Array.isArray(files))
      //err
      return resolve(files)

    files = files
      .filter(path => isImage(path))
      .map(fileName => ({
        sourceImage: sourceDir + fileName,
        fileName,
        sourceDir,
      }))

    resolve(files)
  })
}

function removeDuplicateFiles(toRemoveFrom, comparison) {
  return toRemoveFrom
    .map(fileData =>
      comparison.find(
        comparisonData => fileData.fileName === comparisonData.fileName
      )
        ? null
        : fileData
    )
    .filter(anyData => anyData)
}

function isImage(path) {
  return /.+\.(?:jpe?g|png)$/gi.exec(path)
}
function isFolder(path) {
  return /^(\.*\/)?(?:([^/\n])*\/)*([^/.\n])*\/?$|^.$/gi.exec(path)
}

module.exports = initializeResize
