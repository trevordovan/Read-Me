import fs from 'fs';
import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import hljs from 'highlight.js'

const md = markdownIt({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }
  
      return ''; // use external default escaping
    }
}).use(markdownItAnchor, { permalink: false }); // allows navigating within the md file

export function getMdFileList(directory, callback) {
    // Check if the directory exists
    fs.access(directory, fs.constants.F_OK, (err) => {
        if (err) {
            // Directory does not exist or no permission to access
            callback(new Error('Data directory does not exist or cannot be accessed.'), null);
        } else {
            // Directory exists, proceed to read files
            fs.readdir(directory, (err, files) => {
                if (err) {
                    callback(err, null);
                } else {
                    const mdFiles = files.filter(file => file.endsWith('.md'));
                    callback(null, mdFiles);
                }
            });
        }
    });
};

export function mdToHtml(filePath, callback){
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            callback(err, null);
        } else {
            const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Markdown Rendering Server</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <link rel="manifest" href="/manifest.json">
                    <link rel="stylesheet" type="text/css" href="/styles.css">
                    <link rel="stylesheet" type="text/css" href="/github.css">
                    <script src="/codeBlock.js"></script>
                </head>
                <body>
                    <a class="homeButton" href="/">Home</a>
                    <div class="mdContainer">
                        ${getHtmlFromMd(data)}
                    </div>
                </body>


                </html>
            `;
            callback(null, html);
        }
    });
};

function getHtmlFromMd(data) {
    return md.render(data);
}