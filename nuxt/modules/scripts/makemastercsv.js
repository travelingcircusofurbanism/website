const fs = require('fs')
import { log } from '../../assets/commonFunctions'

const allPostsFile = process.cwd() + '/nuxt/static/generated/posts.json'
const csvPath = process.cwd() + `/allPosts.csv`

export default function() {
  return new Promise(resolve => {
    try {
      fs.readFile(allPostsFile, (err, data) => {
        if (err) return console.error(err)
        const allPosts = JSON.parse(data)
        const csvData = [
          [
            'City',
            'Slug',
            'En Public',
            'Ja Public',
            'Both Public',
            'Neither Public',
            'Date',
          ],
        ]
        allPosts.forEach(p => {
          csvData.push([
            p.city,
            p.slug,
            p.public.en,
            p.public.ja,
            p.public.en && p.public.ja,
            !(p.public.en || p.public.ja),
            p.date,
          ])
        })
        resolve()
        const csvString = csvData.map(row => row.join(',')).join('\n')
        fs.writeFile(csvPath, csvString, console.error)
        log('green', 'Wrote post list csv.')
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
