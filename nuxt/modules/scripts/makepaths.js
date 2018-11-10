const fs = require('fs')
const path = require('path')
import { log } from '../../assets/commonFunctions'

const masterPostDir = process.cwd() + '/posts/'
const pathToStaticPosts = process.cwd() + '/nuxt/static/posts/'

export default function() {
  log('green', ' Generated post paths.')
  createDir(pathToStaticPosts)
  // read all city directories in the master post directory ('tokyo', 'austin', etc)
  const cityDirList = fs
    .readdirSync(masterPostDir)
    .filter(cityDir => cityDir.indexOf('.') === -1)

  const postDirList = fs
    .readdirSync(pathToStaticPosts)
    .filter(cityDir => cityDir.indexOf('.') === -1)
  postDirList
    .filter(
      postDir =>
        !cityDirList.find(cityDir => {
          return cityDir.toLowerCase() === postDir
        })
    )
    .forEach(dirToDelete => {
      log('magenta', ' Deleting unnused dir "' + dirToDelete + '"')
      wipeAndDeleteDirRecursively(pathToStaticPosts + dirToDelete)
    })

  // then, create all new dirs we need
  cityDirList.forEach(cityDir => {
    const formattedCityDir = decodeURI(
      encodeURI(cityDir.toLowerCase()).replace(/e%CC%81/g, '%C3%A9')
    )
    createDir(pathToStaticPosts + formattedCityDir)
    // read all individual post directories in each city directory
    fs.readdirSync(masterPostDir + cityDir)
      .filter(postDir => postDir.indexOf('.') === -1)
      .forEach(postDir => {
        createDir(pathToStaticPosts + formattedCityDir + '/' + postDir)
        createDir(
          pathToStaticPosts + formattedCityDir + '/' + postDir + '/tiny'
        )
        createDir(pathToStaticPosts + formattedCityDir + '/' + postDir + '/med')
        createDir(
          pathToStaticPosts + formattedCityDir + '/' + postDir + '/large'
        )
      })
  })
}

function createDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir)
}

function createOrWipeDir(dir) {
  createDir(dir)
  fs.readdirSync(dir).forEach(file => {
    fs.unlinkSync(dir + '/' + file)
  })
}

function wipeAndDeleteDirRecursively(dir) {
  fs.readdirSync(dir).forEach(fileOrFolder => {
    if (fileOrFolder.indexOf('.') === -1)
      wipeAndDeleteDirRecursively(dir + '/' + fileOrFolder)
    else fs.unlinkSync(dir + '/' + fileOrFolder)
  })
  fs.rmdirSync(dir)
}
