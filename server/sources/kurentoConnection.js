const SocketSource = require('./socketSource');

class KurentoConnectionSource extends SocketSource {
    constructor() {
        super();
    }
}

module.exports = new KurentoConnectionSource();
