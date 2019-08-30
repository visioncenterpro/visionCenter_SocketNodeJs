const path = require('path');
const express = require('express');
const app = express();
const SocketIO = require('socket.io')




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

const io = SocketIO.listen(server)
// Web sockets
io.on('connection', (socket)=>{
  console.log('Usuario conectado '+socket.id);
  socket.on('chat message', (e)=>{
    console.log(e);
    //Emitir a todos los sockets conectado excepto al remitente
    socket.broadcast.emit('chat message', e);
    
  })
})