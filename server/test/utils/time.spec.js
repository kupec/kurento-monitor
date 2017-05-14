const assert = require('chai').assert;

const {getHumanTime} = require('../../utils/time');

describe('utils/time', function () {
    it('must return formated time', async () => {
        const date = new Date(2017, 1, 1, 15, 15, 15, 0);
        assert.equal(getHumanTime(date.getTime()), '3:15:15 pm, 1 Feb 2017');
    });
});
