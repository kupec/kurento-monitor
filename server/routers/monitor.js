const Router = require('./router');

class MonitorRouter extends Router {
    constructor() {
        super();
        this.events = [
            'monitor:start'
        ];
    }
}

module.exports = new MonitorRouter();
