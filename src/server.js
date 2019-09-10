const path = require('path');
const express = require('express');
const app = express();
const SocketIO = require('socket.io')
const socket_mobile = require('./controllers/socket-event/socket-mobile')
const asterisk = require('./controllers/asterisk/conexion')
const route_web = require('./routes/web');
var morgan = require('morgan')
// app.use( morgan())


// Definimos el puerto en el objeto app 
app.set('port', process.env.PORT || 3000)


//archivos estáticos
app.use(express.static(path.join( __dirname, '../public/')))

// VIstas
app.set('views','/views');
//Motor
app.set('view engine', 'ejs');
// Inicializar servidor
const server = app.listen(app.get('port'), ()=>{
  // console.log(`Servidor corriendo en el puerto ${app.get('port')}`)
});

//Rutas web
route_web(app)

///asterisk

// asterisk()





///// Eventos del socket
const io = SocketIO.listen(server)
// Estos procesos se delegaron a la ruta socket/socket-mobile.js
socket_mobile(io)