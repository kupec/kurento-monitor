const express = require('express');
const path = require('path');
const debug = require('debug')('app:http');
const config = require('./config');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const IOController = require('./controllers/io');

IOController.init(io);
app.use(express.static(path.join(__dirname, '..', 'web', 'build')));

debug(`Server started on port ${config.port}`);
server.listen(process.env.PORT || config.port);
