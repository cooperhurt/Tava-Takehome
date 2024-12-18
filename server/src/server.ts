import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

const app = require('express')();
const server = require('http').createServer(app);
dotenv.config();

//Start the server, and setup socket.io
server.listen(8080, () =>
  console.log(`Server started at http://localhost:8080`)
);

// API setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));

const router = express.Router();

// Route/API endpoints
import routes from './routes/employees';
router.use('/employees', routes);

// Setup the server
app.use('/api', router);

export default { server, app };
