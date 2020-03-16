const os = require('os');
const ifaces = os.networkInterfaces();
const path = require('path');
const express = require('express');
const app = express();
const SocketIO = require('socket.io')
const socket_mobile = require('./controllers/socket-event/socket-mobile')
const socket_approval = require('./controllers/socket-event/socket-approval')
const asterisk = require('./controllers/asterisk/conexion')
const route_web = require('./routes/web');


app.set('port', process.env.PORT || 8001)
app.use(express.static(path.join(__dirname, '../public/')))
app.set('views', '/views');
app.set('view engine', 'ejs');
const server = app.listen(app.get('port'), () => {

  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        console.log(ifname + ':' + alias, iface.address);
      } else {
        // this interface has only one ipv4 adress
        console.log(`Aplicación corriendo en: http://${iface.address}:${app.get('port')}`);
      }
      ++alias;
    });
  });
});

const io = SocketIO.listen(server)

// Estos procesos se delegaron a la ruta socket/socket-mobile.js
socket_mobile(io);
socket_approval(io);