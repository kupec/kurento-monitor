class Router {
    constructor() {
        this.events = [];
    }

    init(socket, controller) {
        this.events.forEach(event => {
            const method = event.split(':')[1];
            socket.on(event, (data, callback) => controller[method](socket, data, callback));
        });

        socket.on('disconnect', () => {
            if (controller.disconnect) {
                controller.disconnect(socket);
            }
        });
    }
}

module.exports = Router;
