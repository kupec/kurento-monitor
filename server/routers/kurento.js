const Router = require('./router');

class MonitorRouter extends Router {
    constructor() {
        super();
        this.events = [
            'kurento:release',
            'kurento:getSources'
        ];
    }
}

module.exports = new MonitorRouter();
