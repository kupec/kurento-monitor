const SocketSource = require('./socketSource');

class MonitorsSource extends SocketSource {
    constructor() {
        super();
    }
}

module.exports = new MonitorsSource();
