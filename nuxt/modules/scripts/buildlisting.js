const fs = require('fs')
import { log, softTruncate } from '../../assets/commonFunctions'

require.extensions['.md'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8')
}

const postDir = process.cwd() + '/posts'
const generatedDir = process.cwd() + '/nuxt/static/generated'

const allLocations = new Set()

export default function() {
  return new Promise(resolve => {
    try {
      if (!fs.existsSync(generatedDir)) fs.mkdirSync(generatedDir)
      // wipe the generated dir
      else
        fs.readdirSync(generatedDir).forEach(file => {
          fs.unlinkSync(generatedDir + '/' + file)
        })

      fs.readdir(postDir, (err, posts) => {
        if (err) return log('magenta', err)
        const allPostData = posts
          .filter(pathName => pathName.indexOf('.') === -1)
          .map(city => {
            const cityDir = postDir + '/' + city
            const cityFile = generatedDir + '/' + city.toLowerCase() + '.json'
            const cityPostData = fs
              .readdirSync(cityDir)
              .filter(pathName => pathName.indexOf('.') === -1)
              .map(post => getDataForPost(postDir, city, post))
              .filter(d => d)
              .sort((a, b) => new Date(a.date) < new Date(b.date))
            fs.writeFileSync(cityFile, JSON.stringify(cityPostData), 'utf8')
            return cityPostData
          })
          .reduce((accumulator, currentValue) => {
            return accumulator.concat(currentValue)
          }, [])
          .filter(d => d)
          .sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
          })

        fs.writeFileSync(
          generatedDir + '/posts.json',
          JSON.stringify(allPostData),
          'utf8'
        )
        fs.writeFileSync(
          generatedDir + '/locations.json',
          JSON.stringify(Array.from(allLocations)),
          'utf8'
        )
        log('green', ' Generated post data lists.')
        resolve()
      })
    } catch (e) {
      log(
        'magenta',
        'Uh oh, we failed in building out the post listings for your site. Error details are:'
      )
      console.log(e)
      log(
        'magenta',
        `We'd better fix this one before we do anything else. If it's something that should never break the site, let Jasper know and he'll make it so it never does again.`
      )
      resolve()
    }
  })
}

function getDataForPost(postDir, city, slug) {
  let jaContent, postData, enContent
  try {
    delete require.cache[`${postDir}/${city}/${slug}/data.js`]
    postData = require(`${postDir}/${city}/${slug}/data.js`)
  } catch (e) {}
  try {
    delete require.cache[`${postDir}/${city}/${slug}/content.md`]
    enContent = require(`${postDir}/${city}/${slug}/content.md`)
  } catch (e) {}
  try {
    delete require.cache[`${postDir}/${city}/${slug}/ja.md`]
    jaContent = require(`${postDir}/${city}/${slug}/ja.md`)
  } catch (e) {}

  try {
    if (!postData || (!enContent && !jaContent)) return

    const contentToUseForData = enContent || jaContent

    const languages = {
      en: enContent ? true : false,
      ja: jaContent ? true : false,
    }

    const locations = postData.mapPosition
      ? Array.isArray(postData.mapPosition)
        ? postData.mapPosition.map(p => p.location.toLowerCase())
        : [
            postData.mapPosition.location
              ? postData.mapPosition.location.toLowerCase()
              : null,
          ]
      : null
    if (locations) locations.filter(l => l).forEach(l => allLocations.add(l))

    let title = contentToUseForData.substring(
      contentToUseForData.indexOf('#') + 1
    )

    let jaTitle = null
    if (jaContent) {
      jaTitle = jaContent.substring(jaContent.indexOf('#') + 1)
      jaTitle = jaTitle.substring(0, jaTitle.indexOf('\n'))
    }

    // create nice truncated description
    let description = postData.description
    if (!description)
      description = title
        .substring(title.indexOf('\n')) // remove title
        .replace(/!\[\]\(.*\)[\n\r]*\*.*\*/g, '') // remove images with captions
        .replace(/!\[.*\]\(.*\)/g, '') // remove all images
        .replace(/\[([^\]]*)\]\(.*\)/g, (a, b) => b) // remove markdown links
        .replace(/<.*>.*<\/.*>/g, '') // remove html tags
        .replace(/[\n\r]#+/g, '') // remove #, ##, ###, #### headers
        .replace('>', '') // remove > quotes
        .replace(/\*/g, '') // remove * bolds
        .replace('---', '') // remove <hr> lines
        .replace(/[\n\r]/g, ' ') // remove line breaks
        .replace(/^\s*/, '') // remove excess spaces at the start
    description = softTruncate(description, enContent ? 200 : 70)

    title = title.substring(0, title.indexOf('\n'))

    // create nice usable image path
    let image = postData.image
    if (!image) {
      image = /!\[.*\]\((.*\.(?:jpe?g|png|gif|webm|tiff))\)/g.exec(
        contentToUseForData
      )
      if (!image) {
        // log('magenta', 'No image found for', city + '/' + slug + ', skipping...')
        image = ''
      } else image = image[1]
    }
    if (image.length > 0 && image.substring(0, 4) !== 'http')
      image = `/posts/${city}/${slug}/med/${image.replace('/', '')}`

    const data = {
      slug,
      city: city.toLowerCase(),
      title,
      description,
      url: `/${city}/${slug}`,
      ...postData,
      image,
      languages,
      public: postData.public,
    }
    if (jaTitle) data.jaTitle = jaTitle
    return data
  } catch (e) {
    log(
      'magenta',
      `There was a problem getting the data together for ${city}/${slug}. Here are the error details:`
    )
    console.log(e)
    log(
      'magenta',
      `Don't worry too much, though, because we skipped it for now. Everything should still work, but that post won't show up in the listings.`
    )
  }
}
