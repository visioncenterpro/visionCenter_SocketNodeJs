module.exports = io => {
    // Web sockets
    io.on("connection", socket => {

      socket.on("new_orders_approval", (newOrders) => { 
        socket.broadcast.emit("new_orders_approval", newOrders);
      });

      socket.on("new_schedule_approval", (newSchedule) => { 
        socket.broadcast.emit("new_schedule_approval", newSchedule);
      });

      socket.on("confirm_new_schedule_approval", (newSchedule) => { 
        socket.broadcast.emit("confirm_new_schedule_approval", newSchedule);
      });

    });

  };