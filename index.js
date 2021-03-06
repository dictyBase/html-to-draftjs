#! /usr/bin/env node

const fs = require('fs')
const stateFromHTML = require('draft-js-import-html').stateFromHTML
const JSDOM = require('jsdom').JSDOM
const program = require('commander')
const convertToRaw = require('draft-js').convertToRaw

program
  .version('1.0.0')
  .description('Convert HTML to Draft-JS ContentState')

program
  .command('convert <inputFile> [outputFile]')
  .alias('c')
  .description('Converts HTML file to Draft-JS ContentState and saves to optional outputFile or contentState.js')
  .action((inputFile, outputFile) => {
    fs.readFile(inputFile, 'UTF-8', (err, html) => {
      if (err) {
        console.log(err)
      }

      const dom = new JSDOM(html)
      global.document = dom.window.document
      let contentState = stateFromHTML(html)
      const contentStateString = JSON.stringify(convertToRaw(contentState))

      fs.writeFile(`${outputFile ? outputFile : 'contentState.js'}`, contentStateString, (err) => {
        if (err) {
          console.log(err)
        }

        console.log('Conversion complete!')
      })
    })
  })

program.parse(process.argv)
