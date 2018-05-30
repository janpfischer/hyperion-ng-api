"use strict";
var WebSocketClient = require('websocket').client;


class HyperionNg {
  constructor(host, port, wsTan) {
    this.host = host;
    this.port = port;
    this.wsTan = wsTan;
  }

  getServerInfo(callback){
    this.sendToHyperion("serverinfo","","",this.wsTan, function(err, data) {
      callback(null, data);
    });
  }

  sendToHyperion(command, subcommand, msg, wsTan, callback) {

    const client = new WebSocketClient();
    client.connect('ws://192.168.178.23:19444/');
    let response = "";

    client.on('connectFailed', function(error) {
      console.log('Connect Error: ' + error.toString());
    });

    client.on('connect', function(connection) {
      console.log('WebSocket Client Connected');
      connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
      });
      connection.on('close', function() {
        console.log('Connection Closed');

        //if (callback) callback(null, object);
      });

      connection.on('message', function(message) {
        if (message.type === 'utf8') {
          response = JSON.parse(message.utf8Data());
          connection.close();
          if (callback) callback(null, response);
        }
      });


      if (connection.connected) {
        if (typeof subcommand != 'undefined' && subcommand.length > 0) {
          subcommand = ',"subcommand":"' + subcommand + '"';
        } else {
          subcommand = "";
        }


        if (typeof msg != 'undefined' && msg.length > 0) {
          msg = "," + msg;
        } else {
          msg = "";
        }


        if (typeof wsTan == 'undefined') {
          wsTan = 1;
        }

        connection.send('{"command":"' + command + '", "tan":' + wsTan + subcommand + msg + '}');

      }
    });

  }

}


const hyperion = new HyperionNg("192.168.178.23", "19444", "666");
//hyperion.sendToHyperion('serverinfo', '', '', 666, function(err, data) {
//  console.log(data);
//});

hyperion.getServerInfo(function (err, data){
  console.log(data.info);
});






//sendToHyperion("serverinfo");
