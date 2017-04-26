import io from 'socket.io-client';
import {EventEmitter} from 'events';

class IOController extends EventEmitter {
    init() {
        this.socket = io('ws://localhost:3000');
        this.socket.on('connect', () => {
            this.emit('connected');
            this.subscribeEvents()
        });
    }

    subscribeEvents() {
        this.socket.on('*', (event, data) => this.emit(event, data));
    }

    send(event, data, callback) {
        this.socket.emit(event, data, callback);
    }
}

export default new IOController();
