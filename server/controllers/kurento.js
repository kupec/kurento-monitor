const KurentoClient = require('kurento-client');
const KurentoConnectionSource = require('../sources/kurentoConnection');

const wrap = require('../utils/promiseWrapper');

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

            for (let i = 0; i < elements.length; i++) {
                kurentoConnection.getMediaobjectById(elements[i]).then(e => e && e.release());
            }

            if (callback)
                callback();
        } catch (err) {
            // console.log(err);
        }
    }
}

module.exports = new KurentoController();
