const fs = require('fs');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const md = markdownIt().use(markdownItAnchor, { permalink: false });

exports.renderMarkdownToHtml = (filePath, callback) => {
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            callback(err, null);
        } else {
            const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <link rel="stylesheet" type="text/css" href="custom.css">
                    <script src="codeBlock.js"></script>
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
