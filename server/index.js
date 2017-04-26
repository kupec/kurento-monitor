const express = require('express');
const path = require('path');
const config = require('./config');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const IOController = require('./controllers/io');

IOController.init(io);
app.use(express.static(path.join(__dirname, '..', 'web', 'build')));

console.log(`server started on port ${config.port}`);
server.listen(config.port);

function runEventLoop(outputBox) {
    outputBox.key(['escape', 'q'], () => {
        process.exit(0);
    });

    outputBox.key(['r'], () => {
        confirmReleasePipelines();
    });

    updatePeriodically(outputBox);
}

function updatePeriodically(outputBox) {
    monitor.fetchPipelines(options.host, options.port, function (error, pipelines) {
        if (error)
            return updateAfterTime(outputBox);

        printPipelinesInfo(outputBox, pipelines);
        additionalActions();
        updateAfterTime(outputBox);
    });
}

function updateAfterTime(outputBox) {
    setTimeout(() => updatePeriodically(outputBox), 1000);
}

function printPipelinesInfo(outputBox, pipelines) {
    pipelines.forEach(addLeakInfoToPipeline);
    currentPipelines = pipelines;

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

function additionalActions() {
    if (options.autoremove) {
        releaseLeakedAndEmptyPipelines();
    }
}

function confirmReleasePipelines() {
    const question = blessed.question({
        parent: screen,
        width: '30%',
        height: '20%',
        top: '40%',
        left: '35%',
        align: 'center',
        border: 'line',
        input: true,
        keyable: true
    });
    question.ask('Are you sure you want to release leaked pipelines?', (error, answer) => {
        if (answer) {
            releaseLeakedAndEmptyPipelines();
        }
    });
}

function releaseLeakedAndEmptyPipelines() {
    const leakedAndEmptyPipelines = currentPipelines.filter(p => p.leak && p.childsLength === 0);
    kurento.releasePipelines(leakedAndEmptyPipelines);
}
