import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

import router from './router.js';
import config from '../config.js';

export function startServer(args) {
    const app = express();
    if (config.corsOptions) {
        app.use(cors(config.corsOptions));
    }
    
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    app.use(express.static(path.join(__dirname, '../public')));
    app.use('/', router);

    let address = '127.0.0.1'
    if (args.includes('--listen')) {
        address = '0.0.0.0';
    }

    app.listen(config.port, address, () => {
        console.log(`Server running on http://${address}:${config.port}`);
    });

    return app;
}