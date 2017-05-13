class Wrapper {
    constructor(obj) {
        this.obj = obj;
    }

    get() {
        return this.obj;
    }
}

function wrap(promise) {
    return promise.then(obj => new Wrapper(obj));
}

module.exports = {wrap, Wrapper};
