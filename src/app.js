import * as server from './server.js';

const args = process.argv.slice(2);

server.startServer(args);
