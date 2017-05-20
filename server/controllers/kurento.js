const KurentoClient = require('kurento-client');
const KurentoConnectionSource = require('../sources/kurentoConnection');

const {wrap} = require('../utils/promiseWrapper');

const MAX_ATTEMTPS = 5;

class KurentoController {
    async connect(url, errorCallback) {
        let attempts = 0;
        const client = await wrap(KurentoClient(url));
        client.get()._re.on('reconnect', () => {
            if (attempts >= MAX_ATTEMTPS) {
                return client.get().close();
            }
            attempts++;
            errorCallback(`can\'t connect to kurento ${url}`);
        });
        return client;
    }

    getServerManager(kurentoConnection) {
        return wrap(kurentoConnection.getServerManager());
    }

    async release(socket, data, callback) {
        try {
            const {elements} = data;
            const kurentoConnection = KurentoConnectionSource.get(socket);

            elements.forEach(element => kurentoConnection.getMediaobjectById(element).then(e => e && e.release()));

            callback && callback();
        } catch (err) {
            // console.log(err);
        }
    }
}

module.exports = new KurentoController();
