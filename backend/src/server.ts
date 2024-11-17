import express from 'express';
import http from 'http';

import Router from './routes';

import { initWASocket } from './libs/wbot';

const app = express();
const server = http.createServer(app);
app.use(express.json());

app.use(Router);

// initWASocket();

export default server;