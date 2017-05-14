class SocketSource {
    constructor() {
        this.entities = {};
    }

    add(socket, manager) {
        this.entities[socket.id] = manager;
    }

    get(socket) {
        return this.entities[socket.id];
    }

    remove(socket) {
        delete this.entities[socket.id];
    }
}

module.exports = SocketSource;
