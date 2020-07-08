const axios = require('axios');
const Swal = require('sweetalert2');

class FactoryRealtimeManager {

    constructor() {
    }

    activateListener(io) {

        try {

            io.on("connection", socket => {

                socket.on("chat message", e => {

                  console.log("recibido desde la clase factory"+e);
                  //Emitir a todos los sockets conectado excepto al remitente
                  socket.broadcast.emit("chat message", e);
            
                  //Enviar mensaje sólo a usuario emisor //io.to(socket.id).emit('chat message', e);
                  // io.emit('chat message', e);//Emitir a todos los sockets conectados.
                });

                socket.on("new_signal", e => { 
                    socket.broadcast.emit("new_signal", e);
                });
    
                socket.on("move_timeline_date", e => { 
                    socket.broadcast.emit("move_timeline_date", e);
                });

                socket.on("update_management_dashboard", e => { 
                    socket.broadcast.emit("update_management_dashboard", e);
                });

                socket.on("refresh_factory_process_stats", e => { 
                    socket.broadcast.emit("refresh_factory_process_stats", e);
                });

                socket.on("refresh_management_process_stats", e => { 
                    socket.broadcast.emit("refresh_management_process_stats", e);
                });
                

            });


        }catch(error) {

            console.log("error "+error);

        }

    }

    process() {

        axios.post('', {


        }).then((response) => {


        }).catch(this.processError);

    }

    processError(error) {

        Swal.fire({
            title: 'Algo no Anda Bien...',
            html:  '<h4>'+error+'</h4>',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Ok, Revisaré',
        });

    }

}

module.exports = FactoryRealtimeManager;