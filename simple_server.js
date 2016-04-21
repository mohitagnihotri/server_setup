var os = require('os');
var net = require('net');

var PORT = 9000;

var ip = null;
var save_first_ipv4 = function (iface) {
  if (!ip && !iface.internal && 'IPv4' === iface.family) {
    ip = iface.address;
  }
};
var interfaces = os.networkInterfaces();
for (var ifName in interfaces) {
  if (!ip) {
    interfaces[ifName].forEach(save_first_ipv4);
  }
}

console.log("OK I'm listening on port " + PORT + " here at IP address " + ip + "!");
console.log("Now run the following curl command in another window,");
console.log("replacing <DEVICE_ID> and <ACCESS_TOKEN>.");
console.log("curl https://api.particle.io/v1/devices/<DEVICE_ID>/connect -d access_token=<ACCESS_TOKEN> -d ip=" + ip);

var server = net.createServer(function(socket){
  console.log("Someone connected from " + socket.remoteAddress + ":" + socket.remotePort + "!");
  process.stdout.write('>> ');
    var letters = [];
  process.stdin.on('data', function(d) {
     
      socket.write(d);
        console.log(d+"first");
    
    process.stdout.write('>> ');
  });
});
server.listen(PORT);