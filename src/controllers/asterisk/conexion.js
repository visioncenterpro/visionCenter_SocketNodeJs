//Asterisk
module.exports = ()=>{
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
  'channel':'SIP/2301',
  'context':'from-internal',
  'exten':'573043788629',
  'CallerID':'3043788629',
  'calleridname': 'Luis Fernando',
  'priority':1,
  'Async':'yes',
  'variable':{
    'name1':'value1',
    'name2':'value2'
  }
},(err, res)=>{
  console.log(res);
  console.log(err);
});
}