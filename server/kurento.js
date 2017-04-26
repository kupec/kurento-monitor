function releasePipelines(pipelines) {
    pipelines.forEach(p => p.release());
}

module.exports = {
    releasePipelines: releasePipelines
};