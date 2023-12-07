const express = require('express');
const fs = require('fs');
const markdownIt = require('markdown-it');
const md = new markdownIt();
const app = express();
const port = 8083;

app.get('/', (req, res) => {
    fs.readFile('/data/README.md', 'utf8', function(err, data) {
        if (err) {
            res.send('Error reading the Markdown file.');
        } else {
            res.send(md.render(data));
        }
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${port}`);
});

