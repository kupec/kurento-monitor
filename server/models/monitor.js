const time = require('../utils/time');
const MONITOR_INTERVAL = 1000;

class Monitor {
    constructor(socket, manager) {
        this.socket = socket;
        this.kurentoManager = manager.kurentoManager;
        this.monitorInterval = null;
    }

    start() {
        this.tick();
        this._initInterval();
    }

    stop() {
        this._stopInterval();
    }

    async tick() {
        const pipelines = await this.kurentoManager.getPipelines();
        const mediaPipelinesInfo = await this.getMediaElementsInfo(pipelines);
        this.socket.emit('monitor:pipelines', mediaPipelinesInfo);


        const serverInfo = await this.getServerInfo();
        this.socket.emit('monitor:serverInfo', serverInfo);
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

    async getServerInfo() {
        const info = await this.kurentoManager.getInfo();
        const usedMemory = await this.kurentoManager.getUsedMemory();
        return {
            usedMemory,
            version: info.version,
            type: info.type
        };
    }

    _initInterval() {
        this.monitorInterval = setInterval(() => this.tick(), MONITOR_INTERVAL);
    }

    _stopInterval() {
        clearInterval(this.monitorInterval);
    }
}

module.exports = Monitor;
