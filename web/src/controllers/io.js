import io from 'socket.io-client';
import {EventEmitter} from 'events';

import wildcard from 'socketio-wildcard';
const patch = wildcard(io.Manager);

class IOController extends EventEmitter {
    init() {
        const serverUrl = process.env.NODE_ENV === 'production' ? location.origin : 'http://localhost:3000';
        this.socket = io(serverUrl);
        patch(this.socket);
        this.socket.on('connect', () => {
            this.emit('connected');
            this.subscribeEvents()
        });
    }

    subscribeEvents() {
        this.socket.on('*', packet => this.emit(packet.data[0], packet.data[1]));
    }

    send(event, data, callback) {
        this.socket.emit(event, data, callback);
    }
}

export default new IOController();
