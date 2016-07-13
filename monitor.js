'use strict';

const async = require('async');
const kurento = require('kurento-client');

module.exports = {
    fetchPipelines
};

function fetchPipelines(host, port, callback) {
    const objects = {};

    async.waterfall([
        (done) => connectToKurento(host, port, done),
        saveRequestedObject('kurentoClient', objects),
        (done) => objects.kurentoClient.getServerManager(done),
        saveRequestedObject('serverManager', objects),
        (done) => objects.serverManager.getPipelines(done),
        saveRequestedObject('pipelines', objects),
        (done) => fetchTimeForPipelines(objects.pipelines, done)
    ], function(error) {
        if (error)
            return callback(error);

        callback(null, objects.pipelines);
    });
}

function connectToKurento(host, port, callback) {
    const url = `ws://${host}:${port}/kurento`;
    kurento(url, callback);
}

function saveRequestedObject(key, heap) {
    return function (object, callback) {
        heap[key] = object;
        callback();
    };
}

function fetchTimeForPipelines(pipelines, callback) {
    async.eachSeries(pipelines,
        function(aPipeline, done) {
            aPipeline.getCreationTime((error, time) => {
                if (error)
                    return done(error);

                aPipeline.creationTime = time;
                done();
            });
        }, callback);
}
