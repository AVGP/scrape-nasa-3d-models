const modelUrls = require('./model-urls.json')
const rp = require('request-promise')
const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

const BASE_URL = 'https://nasa3d.arc.nasa.gov'

console.log(`Loaded list of ${modelUrls.length} 3D model URLs`)

// visit each page, extract ZIP link & download
modelUrls.forEach((modelUrl) => {
  rp(modelUrl).then((html) => {
    let $ = cheerio.load(html)

    let zipUrl = $('.asset-download > div > ul > li > button').attr('onclick').toString().match(/='(.*)'/i)[1]
    let outputPath = 'archives/' + zipUrl.match(/\/([^\/]+)$/)[1]
    console.log('downloading ', zipUrl, ' into ', outputPath)
    request(BASE_URL + zipUrl)
    .pipe(fs.createWriteStream(outputPath))
    .on('close', () => {
      console.log('written ', outputPath)
    })
    //console.log(zipUrl)
  }, (err) => {
    console.error('Cannot load ', modelUrl)
  })
})