const assert = require('chai').assert;

const {wrap, Wrapper} = require('../../utils/promiseWrapper');

const testObject = {test: 5};
const testPromise = Promise.resolve().then(() => testObject);

describe('wrapPromise', function () {
    it('must return Wrapper', async () => {
        const wrapped = await wrap(testPromise);
        assert(wrapped instanceof Wrapper);
    });

    it('can get equal object', async () => {
        const wrapped = await wrap(testPromise);
        assert.deepEqual(wrapped.get(), testObject);
    });
});
