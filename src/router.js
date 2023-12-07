const express = require('express');
const router = express.Router();
const path = require('path');
const mdRenderer = require('./mdRenderer');

const dataDir = path.join(__dirname, '../data');

router.get('/', (req, res) => {
    mdRenderer.getMdFileList(dataDir, (err, files) => {
        if (err) {
            // Handle the error when the data directory doesn't exist or is inaccessible
            //res.status(500).send(err.message);
            res.send(renderDataNotFound());
        } else if (files.length === 0) {
            res.send(renderDataEmpty());
        } else if (files.length === 1) {
            renderMd(res, path.join(dataDir, files[0]));
        } else {
            res.send(renderMdList(files));
        }
    });
});


router.get('/file/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(dataDir, filename);
    renderMd(res, filePath);
});

/* Html rendered Markdown page. See mdToHtml */
function renderMd(res, filePath) {
    mdRenderer.mdToHtml(filePath, (err, html) => {
        if (err) {
            res.status(500).send(renderMdError());
        } else {
            res.send(html);
        }
    });
}

/* List Page */
function renderMdList(files) {
    const fileListItems = files.map(file => `
        <li class="md-file-item">
            <a href="/file/${file}">${file}</a>
        </li>
    `).join('');

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Markdown Rendering Server</title>
            <link rel="stylesheet" type="text/css" href="/styles.css">
        </head>
        <body>
            <div class="list-page">
                <h1>Markdown Rendering Server</h1>
                <div class="md-file-list-container">
                    <ul class="md-file-list">${fileListItems}</ul>
                </div>
            </div>
        </body>
        </html>
    `;
}

/* Error Pages */
function renderDataNotFound() {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Error </title>
            <link rel="stylesheet" type="text/css" href="/styles.css">
        </head>
        <body>
            <div class='data-not-found'>
                <p>
                    Error. Data directory does not exist or cannot be accessed.
                </p>
            </div>
        </body>
        </html>
    `;
}

function renderDataEmpty() {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Error </title>
            <link rel="stylesheet" type="text/css" href="/styles.css">
        </head>
        <body>
            <div class='data-not-found'>
                <p>
                    Data directory is empty.
                </p>
            </div>
        </body>
        </html>
    `;
}

function renderMdError() {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Error </title>
            <link rel="stylesheet" type="text/css" href="/styles.css">
        </head>
        <body>
            <div class='data-not-found'>
                <p>
                    Error reading the Markdown file.
                </p>
            </div>
        </body>
        </html>
`;
}

module.exports = router;