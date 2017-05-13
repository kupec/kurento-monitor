class Wrapper {
    constructor(obj) {
        this.obj = obj;
    }

    get() {
        return this.obj;
    }
}

function wrapPromise(promise) {
    return promise.then(obj => new Wrapper(obj));
}

module.exports = wrapPromise;
