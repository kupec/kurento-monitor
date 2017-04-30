const time = require('../utils/time');
const MONITOR_INTERVAL = 1000;

class Monitor {
    constructor(socket, manager) {
        this.socket = socket;
        this.kurentoManager = manager.kurentoManager;
        this.monitorInterval = null;
    }

    start() {
        this._initInterval();
    }

    stop() {
        this._stopInterval();
    }

    async tick() {
        const pipelines = await this.kurentoManager.getPipelines();
        const mediaPipelinesInfo = await this.getMediaElementsInfo(pipelines);
        this.socket.emit('monitor:pipelines', mediaPipelinesInfo);
    }

    async getMediaElementsInfo(mediaElements) {
        const result = [];
        for (let i = 0; i < mediaElements.length; i++) {
            const mediaElement = mediaElements[i];
            const name = await mediaElement.getName();
            const creationTime = await mediaElement.getCreationTime();
            const type = mediaElement.constructor.name;
            let childrens = await mediaElement.getChildren();
            if (childrens.length) {
                childrens = await this.getMediaElementsInfo(childrens);
            }
            result.push({
                name,
                childrens,
                type,
                creationTime: time.getHumanTime(creationTime * 1000),
                id: mediaElement.id
            });
        }
        return result;
    }

    _initInterval() {
        this.monitorInterval = setInterval(() => this.tick(), MONITOR_INTERVAL);
    }

    _stopInterval() {
        clearInterval(this.monitorInterval);
    }
}

module.exports = Monitor;
