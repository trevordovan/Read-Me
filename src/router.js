const express = require('express');
const router = express.Router();
const mdRenderer = require('./mdRenderer');

router.get('/', (req, res) => {
    mdRenderer.renderMarkdownToHtml('../data/README.md', (err, html) => {
        if (err) {
            res.send('Error reading the Markdown file.');
        } else {
            res.send(html);
        }
    });
});

module.exports = router;
