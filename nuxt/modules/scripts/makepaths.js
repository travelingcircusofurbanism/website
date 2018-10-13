const fs = require('fs')
const path = require('path')
import { log } from '../../assets/commonFunctions'

const masterPostDir = process.cwd() + '/posts/'
const pathToStaticPosts = process.cwd() + '/nuxt/static/posts/'

export default function() {
  log('green', ' Generated post paths.')
  createDir(pathToStaticPosts)
  // read all city directories in the master post directory ('tokyo', 'austin', etc)
  fs.readdirSync(masterPostDir)
    .filter(cityDir => cityDir.indexOf('.') === -1)
    .forEach(cityDir => {
      createDir(pathToStaticPosts + cityDir)
      // read all individual post directories in each city directory
      fs.readdirSync(masterPostDir + cityDir)
        .filter(postDir => postDir.indexOf('.') === -1)
        .forEach(postDir => {
          createDir(pathToStaticPosts + cityDir + '/' + postDir)
          createDir(pathToStaticPosts + cityDir + '/' + postDir + '/tiny')
          createDir(pathToStaticPosts + cityDir + '/' + postDir + '/med')
          createDir(pathToStaticPosts + cityDir + '/' + postDir + '/large')
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

function wipeAndDeleteDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    fs.unlinkSync(dir + '/' + file)
  })
  fs.rmdirSync(dir)
}
