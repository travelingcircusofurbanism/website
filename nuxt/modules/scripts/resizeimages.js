const fs = require('fs')
const path = require('path')
const sharper = require('./sharper')
import { log } from '../../assets/commonFunctions'

const masterPostDir = process.cwd() + '/posts/'
const inputDir = 'images/'
const pathToStaticPosts = '../../../../nuxt/static/posts/'
const tinyDir = 'tiny/'
const medDir = 'med/'
const largeDir = 'large/'

const largeDimensions = [2000, 2000]
const medDimensions = [1200, 500]
const tinyDimensions = [48, 20]

export default function() {
  return new Promise(resolve => {
    let first = true
    // read all city directories in the master post directory ('tokyo', 'austin', etc)
    fs.readdirSync(masterPostDir)
      .filter(cityDir => cityDir.indexOf('.') === -1)
      .forEach(cityDir => {
        cityDir += '/'
        const formattedCityDir = cityDir.toLowerCase()
        // read all individual post directories in each city directory
        fs.readdirSync(masterPostDir + cityDir)
          .filter(postDir => postDir.indexOf('.') === -1)
          .forEach(async postDir => {
            postDir += '/'
            // full size images are in /full, resized images are in /generated/resized
            const inputPath = masterPostDir + cityDir + postDir + inputDir
            const resizedPath =
              pathToStaticPosts + formattedCityDir + postDir + medDir
            const tinyPath =
              pathToStaticPosts + formattedCityDir + postDir + tinyDir
            const largePath =
              pathToStaticPosts + formattedCityDir + postDir + largeDir

            const result = await sharper([
              {
                source: inputPath,
                outputFolder: resizedPath,
                width: medDimensions[0],
                height: medDimensions[1],
                overwrite: false,
              },
              {
                source: inputPath,
                outputFolder: tinyPath,
                width: tinyDimensions[0],
                height: tinyDimensions[1],
                overwrite: false,
              },
              {
                source: inputPath,
                outputFolder: largePath,
                width: largeDimensions[0],
                height: largeDimensions[1],
                overwrite: false,
              },
            ])

            if (result.resized.length > 0) {
              if (first) {
                log('cyan', '\nResized:')
                first = false
              }
              log(
                'cyan',
                '',
                result.resized.length,
                `image${result.resized.length > 1 ? 's' : ''} from`,
                cityDir + postDir
              )
            }
          })
      })
    resolve()
  })
}
