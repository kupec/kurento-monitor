'use strict';

const async = require('async');
const moment = require('moment');
const monitor = require('./monitor');
const blessed = require('blessed');
const _ = require('lodash');

const LEAK_TIMEOUT = 4 * 3600 * 1000;

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
        scrollable: true,
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
    pipelines.forEach(addLeakInfoToPipeline);

    const realPipelines = pipelines.filter(p => !p.leak);
    const leakPipelines = pipelines.filter(p => p.leak);

    outputBox.content = _.flattenDeep([
        `Current time: ${moment().format('h:mm:ss a, D MMM YYYY')}`,
        `Total pipelines count: ${pipelines.length}`,
        `Real pipelines count: ${realPipelines.length}`,
        renderNameList(realPipelines),
        `Leaks pipelines count: ${leakPipelines.length}`,
        renderNameList(leakPipelines)
    ]).join('\n');
    screen.render();
}

function addLeakInfoToPipeline(pipeline) {
    const since = moment(pipeline.creationTime, 'X');
    const elapsedMs = Date.now() - pipeline.creationTime * 1000;
    const duration = moment.duration(elapsedMs, 'milliseconds');

    pipeline.since = since;
    pipeline.duration = duration;
    pipeline.leak = elapsedMs > LEAK_TIMEOUT;
}

function renderNameList(pipelines) {
    const projectPipelines = _.groupBy(pipelines, getProjectName);

    return _.map(projectPipelines, renderProjectPipelineList);
}

function getProjectName(pipeline) {
    const name = pipeline.name;
    return name.split('__')[0];
}

function renderProjectPipelineList(pipelines, project) {
    const pipelineList = pipelines.map(aPipeline => {
        const name = aPipeline.name;
        const created = aPipeline.since.format('h:mm:ss a, D MMM YYYY');
        const childs = aPipeline.childsLength;

        return `- ${name} (created ${created}, childrens: ${childs})`;
    });

    return [project].concat(pipelineList);
}
