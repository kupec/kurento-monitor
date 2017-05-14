const assert = require('chai').assert;

const {getHumanTime, isTimeBeforeNow} = require('../../utils/time');

describe('utils/time', function () {
    it('(getHumanTime) must return formated time', async () => {
        const date = new Date(2017, 1, 1, 15, 15, 15, 0);
        assert.equal(getHumanTime(date.getTime()), '3:15:15 pm, 1 Feb 2017');
    });

    it('(isTimeBeforeNow) time is before now', () => {
        const time = Date.now() - 3000;
        assert(isTimeBeforeNow(time, 2000));
    });

    it('(isTimeBeforeNow) time is not before now', () => {
        const time = Date.now() - 3000;
        assert.isFalse(isTimeBeforeNow(time, 4000));
    });
});
