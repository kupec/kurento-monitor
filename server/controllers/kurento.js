const KurentoClient = require('kurento-client');
const KurentoManager = require('../models/kurentoManager');
const KurentoConnection = require('../models/kurentoConnection');
const KurentoConnectionSource = require('../sources/kurentoConnection');

const CLIENT_OPTIONS = {failAfter: 3};

class KurentoController {
    connect(url) {
        return KurentoClient(url, CLIENT_OPTIONS)
            .then(c => new KurentoConnection(c));
    }

    getServerManager(kurentoConnection) {
        return kurentoConnection.getServerManager()
            .then(m => new KurentoManager(m));
    }

    async release(socket, data, callback) {
        try {
            const {elements} = data;
            const kurentoConnection = KurentoConnectionSource.get(socket);

            for (let i = 0; i < elements.length; i++) {
                kurentoConnection.getMediaobjectById(elements[i]).then(e => e && e.release());
            }

            if (callback)
                callback();
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new KurentoController();
