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
  "msg":"Hola Raga ss"
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

const io = SocketIO.listen(server)

// Web sockets
io.on('connection', (socket)=>{
  console.log('Usuario conectado '+socket.id);
  socket.on('chat message', (e)=>{
    console.log(e);
    //Enviar mensaje sólo a usuario emisor //io.to(socket.id).emit('chat message', e);
    io.emit('chat message', e);
  })

  // socket.emit('algo', socket)
})