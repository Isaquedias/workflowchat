import express from 'express';
import http from 'http';
import cors from 'cors';

import Router from './routes';

import { initWASocket } from './libs/wbot';

const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cors());

app.use(Router);

// initWASocket();

export default server;