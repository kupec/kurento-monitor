const moment = require('moment');

function getHumanTime(unixTime) {
    return moment(unixTime).format('h:mm:ss a, D MMM YYYY');
}

module.exports = {getHumanTime};
