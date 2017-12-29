#! /usr/bin/env node

const fs = require('fs')
const stateFromHTML = require('draft-js-import-html').stateFromHTML
const JSDOM = require('jsdom').JSDOM
const program = require('commander')

program
  .version('1.0.0')
  .description('Convert HTML to Draft-JS ContentState')

program
  .command('convert <inputFile> [outputFile]')
  .alias('c')
  .description('Converts HTML file to Draft-JS ContentState and saves to optional outputFile or contentState.js')
  .action((inputFolder, outputFolder) => {
      fs.readdir(inputFolder, (err, files) => {
        if (err) {
          console.log(err)
        }

        files.forEach(file => {
          fs.readFile(file, 'UTF-8', (err, html) => {
            if (err) {
              console.log(err)
            }
            const dom = new JSDOM(file)
            global.document = dom.window.document
      
            let contentState = stateFromHTML(html)
            const contentStateString = JSON.stringify(contentState)
      
            fs.writeFileSync(`${file + '.js'}`, contentStateString, (err) => {
              if (err) {
                console.log(err)
              }
      
              console.log('Conversion complete!')
            })
          })
        })
      })
  })

program.parse(process.argv)
