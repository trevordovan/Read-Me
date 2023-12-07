const express = require('express');
const path = require('path');
const cors = require('cors');

const router = require('./router');
const config = require('../config');

function startServer() {
    const app = express();
    if (config.corsOptions) {
        app.use(cors(config.corsOptions));
    }
    app.use(express.static(path.join(__dirname, '../public')));
    app.use('/', router);

    app.listen(config.port, '0.0.0.0', () => {
        console.log(`Server running on http://localhost:${config.port}`);
    });

    return app;
}

module.exports = startServer;
