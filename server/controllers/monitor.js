const IOController = require('./io');
const KurentoController = require('./kurento');

class MonitorController {
    async start(socket, data, callback) {
        try {
            const {url} = data;

            const client = await KurentoController.connect(url);
            console.log(client);
            callback();
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new MonitorController();