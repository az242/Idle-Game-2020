const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();

const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

io.on('connection', (sock) => {
    sock.join('players');
    
    sock.on('connected', (payload) => {
        io.to('players').emit('joined', payload);
    });
});

server.on('error', () => {
    console.error('Server error: ', err);
});

server.listen(9898, ()=> {
    console.log('Idle Game started on 9898');
});