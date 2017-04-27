const KurentoClient = require('kurento-client');

const CLIENT_OPTIONS = {failAfter: 3};

class KurentoController {
    connect(url) {
        return new Promise((res, rej) => {
            KurentoClient(url, CLIENT_OPTIONS, (err, client) => {
                if (err) {
                    return rej();
                }
                res(client);
            });
        });
    }

    promisify(func) {
        return new Promise((res, rej) => func.then(res).catch(rej));
    }
}

module.exports = new KurentoController();
