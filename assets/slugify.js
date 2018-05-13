module.exports = {
  slugify (rawString) {
    if (!rawString) return null
    return rawString.toString()
      .replace(/\s+/g, '-')           // Replace spaces with _
      .replace(/\./g, '')
      .replace(/\//g, '')
      .replace(/\\/g, '')
      .replace(/\?/g, '')
      .replace(/\%/g, '')
      .replace(/\#/g, '')
      .replace(/\&/g, '')
      .replace(/\!/g, '')
      .replace(/\*/g, '')
      .replace(/'/g, '')
      .replace(/\(/g, '')
      .replace(/\)/g, '')
      .replace(/\;/g, '')
      .replace(/\:/g, '')
      .replace(/\=/g, '')
      .replace(/\+?/g, '')
      .replace(/\,/g, '')
      .replace(/\[/g, '')
      .replace(/\]/g, '')
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '')             // Trim - from end of text
  },
  unSlugify (slug) {
    if (!slug) return null
    return slug.toString()
      .replace(/\-/g, ' ')           // Replace spaces with _
  },
}