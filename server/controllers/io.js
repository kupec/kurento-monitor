const MonitorController = require('./monitor');
const MonitorRouter = require('../routers/monitor');

class IOController {
    init(io) {
        io.on('connection', socket => MonitorRouter.init(socket, MonitorController));
    }
}

module.exports = new IOController();
