const time = require('../utils/time');
const EventEmitter = require('events').EventEmitter;
const MONITOR_TIMEOUT = 1000;
const STATES = {running: 0, stopped: 1};

class Monitor extends EventEmitter {
    constructor(kurentoManager) {
        super();
        this.kurentoManager = kurentoManager;
        this.state = STATES.running;
    }

    start() {
        this.tick();
    }

    stop() {
        this.state = STATES.stopped;
    }

    async tick() {
        if (this.state === STATES.stopped) {
            return;
        }
        await this.getMonitoringData();
        setTimeout(() => this.tick(), MONITOR_TIMEOUT);
    }

    async getMonitoringData() {
        const pipelines = await this.kurentoManager.getPipelines();
        const mediaPipelinesInfo = await this.getMediaElementsInfo(pipelines);
        this.emit('pipelines', mediaPipelinesInfo);


        const serverInfo = await this.getServerInfo();
        this.emit('serverInfo', serverInfo);
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
}

module.exports = Monitor;
