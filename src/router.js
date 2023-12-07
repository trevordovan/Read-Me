const path = require('path');
const express = require('express');
const router = express.Router();
const mdRenderer = require('./mdRenderer');

router.get('/', (req, res) => {
    const mdPath = path.join(__dirname, '../data/README.md');
    mdRenderer.renderMarkdownToHtml(mdPath, (err, html) => {
        if (err) {
            res.send('Error reading the Markdown file.');
        } else {
            res.send(html);
        }
    });
});

module.exports = router;
