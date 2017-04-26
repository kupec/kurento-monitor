class MonitorController {
    async start(socket, data, callback) {
        console.log('start');
        callback();
    }
}

module.exports = new MonitorController();