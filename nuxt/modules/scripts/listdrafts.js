const fs = require('fs')
import { log } from '../../assets/commonFunctions'

const postDir = process.cwd() + '/posts'

export default function() {
  return new Promise(resolve => {
    try {
      const postListPromises = fs
        .readdirSync(postDir)
        .filter(pathName => pathName.indexOf('.') === -1)
        .map(city => {
          const cityDir = postDir + '/' + city
          return getFileListAsync(cityDir)
        })

      Promise.all(postListPromises).then(postLists => {
        let drafts = postLists
          .map(list => {
            return list
              .filter(pathName => pathName.indexOf('.') === -1)
              .map(post => {
                let postData
                try {
                  postData = require(`${post}/data.js`)
                } catch (e) {}
                if (
                  !postData ||
                  !postData.public ||
                  (typeof postData.public === 'object' &&
                    !postData.public.en &&
                    !postData.public.ja)
                )
                  return post
                if (typeof postData.public === 'object' && !postData.public.en)
                  return post + ' (en)'
                if (typeof postData.public === 'object' && !postData.public.ja)
                  return post + ' (ja)'
              })
              .filter(d => d)
          })
          .filter(d => d)
        drafts = [].concat.apply([], drafts)
        if (drafts.length) {
          log('yellow', ' Drafts:')
          let lastCity = ''
          drafts.forEach(d => {
            const [path, city, title] = /.*\/([^/]+)\/([^/]+)$/gi.exec(d)
            if (city !== lastCity) {
              lastCity = city
              log('yellow', '  ', city)
            }
            log('white', '     ・ ' + title)
          })
        } else log('green', 'No current drafts.')
        log() //line break
        resolve(drafts)
      })
    } catch (e) {
      resolve()
    }
  })
}

function getFileListAsync(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, filenames) => {
      if (err) reject(err)
      else resolve(filenames.map(f => dir + '/' + f))
    })
  })
}
