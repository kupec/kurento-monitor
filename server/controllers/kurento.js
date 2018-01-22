const KurentoClient = require('kurento-client');
const KurentoConnectionSource = require('../sources/kurentoConnection');

const {wrap} = require('../utils/promiseWrapper');

const MAX_ATTEMTPS = 5;

class KurentoController {
    async connect(url, errorCallback) {
        let attempts = 0;
        const client = await wrap(KurentoClient(url));
        client.get()._re.on('reconnect', () => {
            if (attempts >= MAX_ATTEMTPS) {
                return client.get().close();
            }
            attempts++;
            errorCallback(`can\'t connect to kurento ${url}`);
        });
        return client;
    }

    getServerManager(kurentoConnection) {
        return wrap(kurentoConnection.getServerManager());
    }

    async release(socket, data, callback) {
        try {
            const {elements} = data;
            const kurentoConnection = KurentoConnectionSource.get(socket);

            elements.forEach(element => kurentoConnection.getMediaobjectById(element).then(e => e && e.release()));

            callback && callback();
        } catch (err) {
            // console.log(err);
        }
    }

    async getSources(socket, data, callback) {
        try {
            const {elements} = data;
            const kurentoConnection = KurentoConnectionSource.get(socket);
            elements.forEach(element => kurentoConnection.getMediaobjectById(element.id)
                .then(e => e.getSourceConnections())
                .then(result => socket.emit('kurento:sourcesInfo', {result}))
            );
            callback && callback();
        } catch (err) {
            //console.log(err);
        }
    }
    async createElement(socket, data, callback) {
        try {
            const {elemToCreate, params, pipelineId} = data;
            const kurentoConnection = KurentoConnectionSource.get(socket);
            kurentoConnection.getMediaobjectById(pipelineId)
                .then(pipeline => {
                    let paramObject = {};
                    try {
                        const newParams = JSON.parse(params);
                        paramObject = newParams;
                    } catch (e) {
                        console.log(e);
                    }
                    if (!pipeline) return callback && callback();
                    return pipeline.create(elemToCreate, paramObject, (err, elem) => {
                        if (!err && paramObject.name) elem.setName(paramObject.name);
                        callback && callback(err, elem);
                    });
                })
        } catch (err) {
            console.log(err);
        }
    }
    async connectElems(socket, data, callback) {
        try {
            const {elems, type} = data;
            const kurentoConnection = KurentoConnectionSource.get(socket);
            let firstElem = null;
            kurentoConnection.getMediaobjectById(elems[0])
                .then(elem => {
                    firstElem = elem;
                    return kurentoConnection.getMediaobjectById(elems[1])
                })
                .then(elem => {
                    console.log('elem', elem, firstElem.connect);
                    firstElem.connect(elem, (type === 'AUDIO' || type === 'VIDEO') ? type : undefined)
                })
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new KurentoController();
