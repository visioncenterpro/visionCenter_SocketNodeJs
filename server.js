const path = require('path');
const express = require('express');
const app = express();
const SocketIO = require('socket.io')
const fs = require("fs"),


nameFile = 'db.json';

let db = [];


fs.readFile(nameFile, 'utf8', (error, datos) => {
  if (error) throw error;
  db = JSON.parse(datos)
  // console.log("El contenido es: ",  db);
});


db.push({
  // "msg":"Hola Raga ss"
})
console.log(db);



fs.writeFile(nameFile, JSON.stringify(db), (err)=> {
  // la funcion es la que maneja lo que sucede despues de termine el evento
  if (err) {
      return console.log(err);
  }
});






app.set('port', process.env.PORT || 3000)


// Rutas
// app.use('/', (req, res) => {
//   res.status(200).send('La API funciona correctamente');
// });

//archivos estáticos
console.log(path.join( __dirname,'publuc'));

app.use(express.static(path.join( __dirname, 'public')))
// Inicializar servidor
const server = app.listen(app.get('port'), ()=>{
  console.log('Servidor corriendo en el puerto '+app.get('port'))

});

//Asterisk
const ami = new require('asterisk-manager')('5038','192.168.0.88','vision','123', true);

// En caso de problemas de conectividad, lo tenemos cubierto.
ami.keepConnected()
// console.log(`Conexión: ${ami.keepConnected()}`);
 
// Escuche cualquier / todos los eventos de AMI.
// ami.on('managerevent', function(evt) {
//   console.log(evt)
// });

// Escuche eventos específicos de AMI. Puede encontrar una lista de nombres de eventos en
// https://wiki.asterisk.org/wiki/display/AST/Asterisk+11+AMI+Events
// ami.on('hangup', function(evt) {
//   console.log(evt)

// });
ami.on('confbridgejoin', function(evt) {
  console.log(evt)

});
 
// // Escuche las respuestas de acción.
ami.on('response', function(evt) {
  console.log(evt)

});

// Realizar una acción de AMI. Se puede encontrar una lista de acciones en
ami.action({
  'action':'originate',
  'channel':'SIP/from-mundialvoip/573115992724',
  'context':'from-internal',
  'exten':'SIP/2301',
  'priority':1,
  'variable':{
    'name1':'value1',
    'name2':'value2'
  }
},(err, res)=>{
  console.log(res);
  console.log(err);
});
 


///// Eventos del socket

const io = SocketIO.listen(server)
// Web sockets
io.on('connection', (socket)=>{
  // console.log('Usuario conectado '+socket.id);
  socket.on('chat message', (e)=>{
    console.log(e);
    //Emitir a todos los sockets conectado excepto al remitente
    socket.broadcast.emit('chat message', e);
  
    //Enviar mensaje sólo a usuario emisor //io.to(socket.id).emit('chat message', e);
    // io.emit('chat message', e);//Emitir a todos los sockets conectados.
  })

  socket.on('new finding', (msg)=>{
    socket.broadcast.emit('chat message', msg);
  })

  socket.on('new image', (data)=>{
    console.log(data);
    socket.broadcast.emit('new image', data)
  })

  socket.on('barcode:instalation', (data)=>{

    console.log(data)
    socket.broadcast.emit('barcode:instalation', data)
  })

  socket.on('data file', (data)=>{

    console.log(data)
    socket.broadcast.emit('data file', data)
  })


})