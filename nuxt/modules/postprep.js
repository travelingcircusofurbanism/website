import resizeImages from './scripts/resizeimages'
import buildListing from './scripts/buildlisting'
import listDrafts from './scripts/listdrafts'
import makePaths from './scripts/makepaths'
import makeMasterCsv from './scripts/makemastercsv'
import transformMarkdown from './scripts/transformmarkdown'

const timeBetweenUpkeeps = 3000
let timer

module.exports = function() {
  this.nuxt.hook('build:templates', upkeep)
}

const upkeep = () => {
  if (timer) return
  timer = setTimeout(() => (timer = null), timeBetweenUpkeeps)
  return new Promise(resolve => {
    buildListing().then(() => {
      makePaths()
      transformMarkdown()
      listDrafts()
      resizeImages()
      makeMasterCsv()
      resolve()
    })
  })
}
