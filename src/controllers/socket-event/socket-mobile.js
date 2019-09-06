module.exports = (io) => {
    // Web sockets
    io.on('connection', (socket) => {
        // console.log('Usuario conectado '+socket.id);
        socket.on('chat message', (e) => {
            console.log(e);
            //Emitir a todos los sockets conectado excepto al remitente
            socket.broadcast.emit('chat message', e);

            //Enviar mensaje sólo a usuario emisor //io.to(socket.id).emit('chat message', e);
            // io.emit('chat message', e);//Emitir a todos los sockets conectados.
        })

        socket.on('new finding', (msg) => {
            socket.broadcast.emit('chat message', msg);
        })

        socket.on('new image', (data) => {
            console.log(data);
            socket.broadcast.emit('new image', data)
        })

        socket.on('barcode:instalation', (data) => {

            console.log(data)
            socket.broadcast.emit('barcode:instalation', data)
        })

        socket.on('data file', (data) => {

            console.log(data)
            socket.broadcast.emit('data file', data)
        })


    })
}