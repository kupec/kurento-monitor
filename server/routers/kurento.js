const Router = require('./router');

class MonitorRouter extends Router {
    constructor() {
        super();
        this.events = [
            'kurento:release',
            'kurento:getSources',
            'kurento:createElement',
            'kurento:connectElems'
        ];
    }
}

module.exports = new MonitorRouter();
