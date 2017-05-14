const moment = require('moment');

function getHumanTime(unixTime) {
    return moment(unixTime).format('h:mm:ss a, D MMM YYYY');
}

function isTimeBeforeNow(time, timeout) {
    const elapsedMs = Date.now() - time;

    return elapsedMs > timeout;
}

module.exports = {getHumanTime, isTimeBeforeNow};
