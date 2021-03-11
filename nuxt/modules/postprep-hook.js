import postPrep from './postprep'

module.exports = function() {
  this.nuxt.hook('build:templates', postPrep)
}
