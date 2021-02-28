const express = require('express');
const app = express();
const graphqlHTTP = require("express-graphql");
const makeExecutableSchema = require("graphql-tools");
const os = require('os');
const ifaces = os.networkInterfaces();
const path = require('path');
const SocketIO = require('socket.io')
const FactoryRealtimeManagers = require('../../socket-event/FactoryRealtimeManager.ts');  
const BOMSchema = require('../schemas/BOMSchemas.ts');
const BOMResolver = require('../resolvers/BOMResolvers.ts');
const AckComponentsSchema = require('../schemas/AckComponentsSchemas.ts');
const AckComponentsResolver = require('../resolvers/AckComponentsResolvers.ts');
const DispatchSchemas = require('../schemas/DispatchSchema.ts');
const DispatchResolver = require('../resolvers/DispatchResolvers.ts');
const LabelSchema = require('../schemas/LabelSchemas.ts');
const LabelResolver = require('../resolvers/LabelResolvers.ts');
const StatisticsSchema = require('../schemas/StatisticsSchemas.ts');
const StatisticsResolver = require('../resolvers/StatisticsResolvers.ts');
const ProjectManagerSchema = require('../schemas/ProjectManagerSchemas.ts');
const ProjectManagerResolver = require('../resolvers/ProjectManagerResolvers.ts');

const Axios = require("axios");
const cors = require('cors');

class WebSocketsServer {

    constructor() {
  
      app.set('port', process.env.PORT || 8001)
      app.use(express.static(path.join(__dirname, '../public/')));
      app.set('views', '/views');
      app.set('view engine', 'ejs');
      app.use(cors());
      
      app.use('/getProductBOM', graphqlHTTP.graphqlHTTP({
        graphiql: true,
        schema: makeExecutableSchema.makeExecutableSchema({
            
            typeDefs: new BOMSchema().getSchema(), 
            resolvers: new BOMResolver().getResolver()
      
        })      
      
      }));
       
      app.use('/XLabels', graphqlHTTP.graphqlHTTP({
        graphiql: true,
        schema: makeExecutableSchema.makeExecutableSchema({
            
            typeDefs: new LabelSchema().getSchema(), 
            resolvers: new LabelResolver().getResolver()
      
        })      
      
      }));

      app.use('/getDispatchProcess', graphqlHTTP.graphqlHTTP({
        graphiql: true,
        schema: makeExecutableSchema.makeExecutableSchema({
            
            typeDefs: new DispatchSchemas().getOwnSchema(), 
            resolvers: new DispatchResolver().getOwnResolver()
      
        })      
      
      }));

      app.use('/getStatisticsProcess', graphqlHTTP.graphqlHTTP({
        graphiql: true,
        schema: makeExecutableSchema.makeExecutableSchema({
            
            typeDefs: new StatisticsSchema().getSchema(), 
            resolvers: new StatisticsResolver().getResolver()
      
        })      
      
      }));      

      app.use('/updateAckComponent', graphqlHTTP.graphqlHTTP({
        graphiql: true,
        schema: makeExecutableSchema.makeExecutableSchema({
            
            typeDefs: new AckComponentsSchema().getSchema(), 
            resolvers: new AckComponentsResolver().getResolver()
      
        })      
      
      }));

      app.use('/getProjectManagerProcess', graphqlHTTP.graphqlHTTP({
        graphiql: true,
        schema: makeExecutableSchema.makeExecutableSchema({
            
            typeDefs: new ProjectManagerSchema().getSchema(), 
            resolvers: new ProjectManagerResolver().getResolver()
      
        })      
      
      }));      

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
  
      const io = SocketIO.listen(server);

      io.on("connection", socket => {

        // socket.broadcast.emit("management_directors_sincronize", {});

        socket.on("chat message", e => {

          socket.broadcast.emit("chat message", e);

          //Enviar mensaje sólo a usuario emisor //io.to(socket.id).emit('chat message', e);
          // io.emit('chat message', e);//Emitir a todos los sockets conectados.
        });

        socket.on("new_signal", e => { 
            socket.broadcast.emit("new_signal", e);
            console.log(e);
        });

        socket.on("management_directors_sincronize", e => {
            
            socket.broadcast.emit("management_directors_sincronize", e);
            console.log(e);
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

        socket.on("visioncenter_event_general_refresh", e => { 
            socket.broadcast.emit("visioncenter_event_general_refresh", e);
            console.log('refresh');
        });
        
    });


      // let factoryRealtimeManager = new FactoryRealtimeManagers();
      // factoryRealtimeManager.activateListener(io);
  
    }
  
  }

  module.exports = WebSocketsServer;