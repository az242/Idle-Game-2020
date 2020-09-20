

writeEvent('Welcome to RPS');

const sock = io('http://74.90.215.202:9898');
sock.on('message', writeEvent);

document
    .querySelector('#chat-form')
    .addEventListener('submit', onFormSubmitted);