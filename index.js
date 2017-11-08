#! /usr/bin/env node

const fs = require('fs')
const stateFromHTML = require('draft-js-import-html').stateFromHTML
const JSDOM = require('jsdom').JSDOM

let contentState
const file = process.argv[2]

fs.readFile(file, 'UTF-8', (err, html) => {
  if (err) {
    console.log(err)
  }

  const dom = new JSDOM(html)
  global.document = dom.window.document
  contentState = stateFromHTML(html)
  const contentStateString = JSON.stringify(contentState)

  fs.writeFile('contentState.js', contentStateString, (err) => {
    if (err) {
      console.log(err)
    }

    console.log('contentState.js file created')
  })
})

module.exports = contentState
