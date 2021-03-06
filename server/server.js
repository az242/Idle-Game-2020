const http = require('http');
var https = require('https');
const express = require('express');
const socketio = require('socket.io');
const fs = require('fs');
const app = express();

const clientPath = `${__dirname}/../client/dist/`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);
//load user info
let userList;
if(fs.existsSync('userInfo.json')) {
    userList = JSON.parse(fs.readFileSync('userInfo.json', 'utf8'));
    console.log('loaded user info: ', userList);
} else {
    userList = {};
}
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
            console.log('user logged in: ', payload);
            sock.to('players').emit('joined', payload);
            sock.emit('login', payload);
        } else {
            //ip exists but failed credential match
            console.log('Invalid Credentials for IP: ' + ip);
            sock.emit('login','invalid credentials');
        }
    });
    sock.on('message', (payload) => {
        console.log(payload.user + ': ' + payload.message);
        sock.to('players').emit('message', payload);
    });
    sock.on('disconnect', () => {
        //do something
    });
});
server.on('error', () => {
    console.error('Server error: ', err);
});
server.listen(9898, ()=> {
    console.log('Idle Game started on 9898');
});