const fs = require('fs');
const path = require('path');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

const md = markdownIt().use(markdownItAnchor, { permalink: false });

exports.getMdFileList = (directory, callback) => {
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

exports.mdToHtml = (filePath, callback) => {
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
                    <script src="/codeBlock.js"></script>
                </head>
                <body>
                    ${md.render(data)}
                </body>
                </html>
            `;
            callback(null, html);
        }
    });
};
