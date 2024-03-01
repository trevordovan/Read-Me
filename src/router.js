import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';

import * as mdRenderer from './mdRenderer.js';
import { Home, DataNotFound, DataEmpty, MdError, Error404 } from './pages/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../data');
const router = express.Router();

router.get('/', (req, res) => {
    mdRenderer.getMdFileList(dataDir, (err, files) => {
        if (err) {
            // Handle the error when the data directory doesn't exist or is inaccessible
            //res.status(500).send(err.message);
            res.send(DataNotFound());
        } else if (files.length === 0) {
            res.send(DataEmpty());
        } else if (files.length === 1) {
            renderMd(res, path.join(dataDir, files[0]));
        } else {
            res.send(Home(files));
        }
    });
});

router.get('/file/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(dataDir, filename); 
    renderMd(res, filePath);
});

/* Render a Markdown page. See mdToHtml */
function renderMd(res, filePath) {
    mdRenderer.mdToHtml(filePath, (err, html) => {
        if (err) {
            res.status(500).send(MdError());
        } else {
            res.send(html);
        }
    });
}

export default router;