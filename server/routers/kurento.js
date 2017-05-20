const Router = require('./router');

class MonitorRouter extends Router {
    constructor() {
        super();
        this.events = [
            'kurento:release'
        ];
    }
}

module.exports = new MonitorRouter();
