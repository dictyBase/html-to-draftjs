# html-to-draftjs
Nodejs command line tool for converting html files to draftjs compatible content

To get started:

```
npm install --save https://github.com/dictyBase/html-to-draftjs
```

The script has one main command called 'convert'.  This command takes one required argument which is an html filename.  It also takes an optional second argument which is an ouput file in which to save the new draft-js ContentState.  It converts the html file to draft-js ContentState and saves the ContentState to the output file if provided, otherwise to a file called contentState.js.

To run the script type:

```
node index convert|c <inputFile> [outputFile]
```

Example:

```
node index c example.html output.js
```

For help type:

```
node index -h
```

The script has been setup to execute with the 'html-to-draft' command.  A suggestion for using this package after it has been downloaded into a project is to setup a script in your package.json file:

```
"scripts": {
    "convert": "html-to-draft c example.html output.js"
}
```

Then in the command line you can run:

```
npm run convert
```
