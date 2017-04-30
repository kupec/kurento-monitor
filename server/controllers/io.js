const MonitorController = require('./monitor');
const MonitorRouter = require('../routers/monitor');

const KurentoController = require('./kurento');
const KurentoRoute = require('../routers/kurento');

class IOController {
    init(io) {
        io.on('connection', socket => {
            KurentoRoute.init(socket, KurentoController);
            MonitorRouter.init(socket, MonitorController);
        });
    }
}

module.exports = new IOController();
