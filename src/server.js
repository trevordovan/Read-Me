import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

import router from './router.js';
import config from '../config.js';

export default function startServer() {
    const app = express();
    if (config.corsOptions) {
        app.use(cors(config.corsOptions));
    }
    
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    app.use(express.static(path.join(__dirname, '../public')));
    app.use('/', router);

    app.listen(config.port, '0.0.0.0', () => {
        console.log(`Server running on http://localhost:${config.port}`);
    });

    return app;
}