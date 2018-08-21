const startOfTrip = new Date('May 25 2018').getTime()

const history = require('./LocationHistory.json').locations

const filteredHistory = history.filter(isTheTimeAfterTheStartOfTheTrip)

function isTheTimeAfterTheStartOfTheTrip (locationDataObject) {
  if (locationDataObject.timestampMs > startOfTrip)
    return true
  else {
    return false
  }
}

const objectWithProperForm = {
  locations: filteredHistory
}

const fs = require('fs')
fs.writeFile('./filteredHistory.json', JSON.stringify(objectWithProperForm))
