const express = require('express');
const path = require('path');
const config = require('./config');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const IOController = require('./controllers/io');

IOController.init(io);
app.use(express.static(path.join(__dirname, '..', 'web', 'build')));

console.log(`server started on port ${config.port}`);
server.listen(config.port);

// function addLeakInfoToPipeline(pipeline) {
//     const since = moment(pipeline.creationTime, 'X');
//     const elapsedMs = Date.now() - pipeline.creationTime * 1000;
//     const duration = moment.duration(elapsedMs, 'milliseconds');
//
//     pipeline.since = since;
//     pipeline.duration = duration;
//     pipeline.leak = elapsedMs > LEAK_TIMEOUT;
// }
