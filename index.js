'use strict';

const async = require('async');
const moment = require('moment');
const monitor = require('./monitor');
const blessed = require('blessed');

const options = parseCommandLine();
const screen = initScreen();
startApplication();

function startApplication() {
    const outputBox = createGUI(screen);
    runEventLoop(outputBox);
}

function parseCommandLine() {
    const args = process.argv.slice(2);
    return {
        host: args[0] || 'localhost',
        port: args[1] || 8888
    };
}

function initScreen() {
    return blessed.screen({smartCSR: true});
}

function createGUI() {
    const outputBox = blessed.box({
        width: '100%',
        bottom: 1,
        border: {
            type: 'line'
        },
        top: 0,
        left: 0,
        content: 'Waiting for kurento connection...'
    });

    const bottomBar = blessed.box({
        height: 1,
        bottom: 0,
        left: 0,
        content: 'Press q or ESC to exit'
    });

    screen.append(outputBox);
    screen.append(bottomBar);
    screen.render();

    return outputBox;
}

function runEventLoop(outputBox) {
    outputBox.key(['escape', 'q'], () => {
        process.exit(0);
    });

    updatePeriodically(outputBox);
}

function updatePeriodically(outputBox) {
    monitor.fetchPipelines(options.host, options.port, function (error, pipelines) {
        if (error)
            return updateAfterTime(outputBox);

        printPipelinesInfo(outputBox, pipelines);
        updateAfterTime(outputBox);
    });
}

function updateAfterTime(outputBox) {
    setTimeout(() => updatePeriodically(outputBox), 1000);
}

function printPipelinesInfo(outputBox, pipelines) {
    let leaks = 0;
    pipelines.forEach(aPipeline => {
        const since = moment(aPipeline.creationTime, 'X');
        const elapsedMs = Date.now() - aPipeline.creationTime * 1000;
        const duration = moment.duration(elapsedMs, 'milliseconds');

        aPipeline.since = since;
        aPipeline.duration = duration;

        if (elapsedMs > 4 * 3600 * 1000)
            leaks++;
    });

    outputBox.content = [
        `Total pipelines count: ${pipelines.length}`,
        `Real pipelines count: ${pipelines.length - leaks}`,
        `Leaks pipelines count: ${leaks}`,
        `Current time: ${moment().format('h:mm:ss a, D MMM YYYY')}`
    ].join('\n');
    screen.render();
}
