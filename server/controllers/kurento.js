const KurentoClient = require('kurento-client');
const KurentoConnectionSource = require('../sources/kurentoConnection');

const {wrap} = require('../utils/promiseWrapper');

const CLIENT_OPTIONS = {failAfter: 3};

class KurentoController {
    connect(url) {
        return wrap(KurentoClient(url, CLIENT_OPTIONS));
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
