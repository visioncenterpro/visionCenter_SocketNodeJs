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

class WebSocketsServer {

    constructor() {
  
      app.set('port', process.env.PORT || 8001)
      app.use(express.static(path.join(__dirname, '../public/')));
      app.set('views', '/views');
      app.set('view engine', 'ejs');
      
      app.use('/getProductBOM', graphqlHTTP.graphqlHTTP({
        graphiql: true,
        schema: makeExecutableSchema.makeExecutableSchema({
            
            typeDefs: new BOMSchema().getSchema(), 
            resolvers: new BOMResolver().getResolver()
      
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
  
      const io = SocketIO.listen(server)
      let factoryRealtimeManager = new FactoryRealtimeManagers();
      factoryRealtimeManager.activateListener(io);
  
    }
  
  }

  module.exports = WebSocketsServer;