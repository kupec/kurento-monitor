class MonitorRouter {
    init(socket, controller) {
        const events = [
            'monitor:start'
        ];
        events.forEach(event => {
            const method = event.split(':')[1];
            socket.on(event, (data, callback) => controller[method](socket, data, callback));
        });
    }
}

module.exports = new MonitorRouter();
