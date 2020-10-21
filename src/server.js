// const socket_mobile = require('./controllers/socket-event/socket-mobile')
// const socket_approval = require('./controllers/socket-event/socket-approval')
const asterisk = require('./controllers/asterisk/conexion')
const route_web = require('./routes/web');
const WebSocketServer = require('./controllers/microservices/app/WebSocketServer.ts');


new WebSocketServer();

// Estos procesos se delegaron a la ruta socket/socket-mobile.js
//socket_mobile(io);
//socket_approval(io);