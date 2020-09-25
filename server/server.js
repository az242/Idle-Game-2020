const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const fs = require('fs');
const app = express();

const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);
console.log('loaded information:', JSON.parse(fs.readFileSync('userInfo.json', 'utf8')));
let userList = JSON.parse(fs.readFileSync('userInfo.json', 'utf8'));;
function compare(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

io.on('connection', (sock) => {
    sock.join('players');
    let ip = sock.handshake.address.split(':')[sock.handshake.address.split(':').length-1];
    console.log('connected with ip', ip);
    sock.on('login', (payload) => {
        if (userList[ip] === undefined) {
            //register user
            console.log('new user detected, registering!')
            userList[ip] = payload;
            sock.to('players').emit('joined', payload);
            sock.emit('login', payload);
            fs.writeFile(`userInfo.json`, JSON.stringify(userList), ()=> {});
        } else if(compare(payload, userList[ip])) {
            //ip exists and credentials match
            sock.to('players').emit('joined', payload);
            sock.emit('login', payload);
        } else {
            //ip exists but failed credential match
            console.log('Invalid Credentials for IP: ' + ip);
            sock.emit('login','invalid credentials');
        }
    });
});
server.on('error', () => {
    console.error('Server error: ', err);
});
server.listen(9898, ()=> {
    console.log('Idle Game started on 9898');
});