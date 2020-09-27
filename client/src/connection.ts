import io from 'socket.io-client';

export class Connection {
    sock;
    constructor(ip: string, port: string) {
        this.sock = io('https://' + ip + ':' + port);
    }
    addListener(subject: string, func: Function) {
        this.sock.on(subject, func);
    }
    emitAction(subject: string, payload: any) {
        this.sock.emit(subject, payload);
    }
}


// sock.on('joined', (payload) => {
//     console.log(payload);
// });