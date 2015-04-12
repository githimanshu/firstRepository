//SERVER
var net = require('net');
var HOST = '127.0.0.1';
var PORT = 2993;

var clients = []
net.createServer(function(sock) {
    sock.name = sock.remoteAddress + ':' + sock.remotePort;
    clients.push(sock);

    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sock.write('HELLO\n'); //send a hello to let the client know they are connected

    sock.on('data', function(data) {
        console.log('Received ' + data.toString());
        if (data.toString() != 'WORLD') {
            console.log('Expected WORLD, received ' + data);
            sock.write('BYE');
        } else {
            sock.write('READY\n');
        }
    });

    sock.on('close', function(data) {
        clients.splice(clients.indexOf(sock), 1);
        console.log('CLOSED: ' + sock.remoteAddress + ':' + sock.remotePort);
    });
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST + ':' + PORT);
