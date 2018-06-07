"use strict";
var WebSocketClient = require('websocket').client;


class HyperionNg {
  constructor(host, port, wsTan, priority) {
    this.host = host;
    this.port = port;
    this.wsTan = wsTan;
    this.priority = priority;
    this.origin = 'Hyperion-Ng-Api';
  }

  /**
   * disableHyperion: Disables all activated components. The Ng-Way to switch off.
   * @param  {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  disableHyperion(callback) {
    this.setComponentState('ALL', false, function(err, data) {
      callback(err, data);
    });
  }

  /**
   * enableHyperion: Enables all previous activated components. The Ng-Way to switch on.
   * @param  {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  enableHyperion(callback) {
    this.setComponentState('ALL', true, function(err, data) {
      callback(err, data);
    });
  }

  /**
   * disableLedDevice: Disables the LED Device. You can see this as "send color black"
   * @param  {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  disableLedDevice(callback) {
    this.setComponentState('LEDDEVICE', false, function(err, data) {
      callback(err, data);
    });
  }

  /**
   * enableLedDevice: Activates the LED Device.
   * @param  {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  enableLedDevice(callback) {
    this.setComponentState('LEDDEVICE', true, function(err, data) {
      callback(err, data);
    });
  }

  /**
   * getServerInfo: Get the server info JSON. All information you need from hyperion. There are more functions available to wrap this. Eg: getAllEffects
   * @param  {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  getServerInfo(callback) {
    this.sendToHyperion("serverinfo", "", "", this.wsTan, function(err, data) {
      callback(err, data);
    });
  }

  /**
   * getAllComponents: Get all components. Wrap function for getServerInfo
   * @param  {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  getAllComponents(callback) {
    this.getServerInfo(function(err, data) {
      callback(err, data.info.components);
    });
  }

  /**
   * getAllEffects: Get all effects. Wrap function for getServerInfo
   * @param  {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  getAllEffects(callback) {
    this.getServerInfo(function(err, data) {
      callback(err, data.info.effects);
    });
  }

  getStartupEffect(callback) {
    this.getServerConfig(function(err, data) {
      callback(err, data.result.foregroundEffect);
    });
  }

  /**
   * getAllGrabbers: Get all Grabbers. Wrap function for getServerInfo
   * @param  {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  getAllGrabbers(callback) {
    this.getServerInfo(function(err, data) {
      callback(err, data.info.grabbers);
    });
  }

  /**
   * getAllLedDevices: Get all led devices. Wrap function for getServerInfo
   * @param  {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  getAllLedDevices(callback) {
    this.getServerInfo(function(err, data) {
      callback(err, data.info.ledDevices);
    });
  }

  /**
   * getLedMappingType: Get the current led mapping type. Wrap function for getServerInfo
   * @param  {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  getLedMappingType(callback) {
    this.getServerInfo(function(err, data) {
      callback(err, data.info.ledMAppingType);
    });
  }

  /**
   * getAllPriorities: Get all priorities. Wrap function for getServerInfo
   * @param  {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  getAllPriorities(callback) {
    this.getServerInfo(function(err, data) {
      callback(err, data.info.priorities);
    });
  }

  /**
   * getSysInfo: Get system information about the operating system of hyperion.ng instance
   * @param  {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  getSysInfo(callback) {
    this.sendToHyperion("sysinfo", "", "", this.wsTan, function(err, data) {
      callback(err, data);
    });
  }

  /**
   * getServerConfig: Gets the current config file
   * @param  {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  getServerConfig(callback) {
    this.sendToHyperion("config", "getconfig", "", this.wsTan, function(err, data) {
      callback(err, data);
    });
  }

  /**
   * getServerConfigSchema: Gets the current config schema
   * @param  {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  getServerConfigSchema(callback) {
    this.sendToHyperion("config", "getschema", "", this.wsTan, function(err, data) {
      callback(err, data);
    });
  }

  /**
   * setMappingTypeMulticolor: Set the Led Mapping Type to multicolor (classic atmolight)
   * @param  {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  setMappingTypeMulticolor(callback) {
    this.setMappingType('multicolor_mean', function(err, data) {
      callback(err, data);
    });
  }

  /**
   * setMappingTypeMulticolor: Set the Led Mapping Type to unicolor (one color calculated and send to ALL leds)
   * @param  {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  setMappingTypeUnicolor(callback) {
    this.setMappingType('unicolor_mean', function(err, data) {
      callback(err, data);
    });
  }

  /**
   * setMappingType: Set the Led Mapping type. Currently 'unicolor_mean' and 'multicolor_mean' is supported. Inserting something other will likely result in an error
   * @param {string}   type     for now only use 'unicolor_mean' or 'multicolor_mean'
   * @param {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  setMappingType(type, callback) {
    this.sendToHyperion("processing", "", '"mappingType": "' + type + '"', this.wsTan, function(err, data) {
      callback(err, data);
    });
  }

  /**
   * setComponentState: Sets a component to true or false
   * @param {string}   comp     The component. You can use getAllComponents to get the names.
   * @param {boolean}   state    true or false
   * @param {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  setComponentState(comp, state, callback) {
    var state_str = state ? "true" : "false";
    this.sendToHyperion("componentstate", "", '"componentstate":{"component":"' + comp + '","state":' + state_str + '}', this.wsTan, function(err, data) {
      callback(err, data);
    });
  }

  /**
   * setColor: Sets the color for a given priority and duration
   * @param {number}   r
   * @param {number}   g
   * @param {number}   b
   * @param {number}   duration in seconds. Use 0 for infinite
   * @param {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  setColor(r, g, b, duration, callback) {
    this.sendToHyperion("color", "", '"color":[' + r + ',' + g + ',' + b + '], "priority":' + this.priority + ',"duration":' + duration * 1000 + ',"origin":"' + this.origin + '"', this.wsTan, function(err, data) {
      callback(err, data);
    });
  }

  /**
   * setColorToBlackPermanently: Sets the color to black with duration 0
   * @param {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  setColorToBlackPermanently(callback) {
    this.sendToHyperion("color", "", '"color":[0,0,0], "priority":' + this.priority + ',"duration":0,"origin":"' + this.origin + '"', this.wsTan, function(err, data) {
      callback(err, data);
    });
  }

  /**
  * setEffect: Sets an effect.
  * @param {string}   effectName You can use getAllEffects to get the name
  * @param {number}   duration   in seconds. Use 0 for infinite
  * @param {Function} callback
  * @return {Function} callback return string from hyperion.ng
  */
  setEffect(effectName, duration, callback) {
    this.sendToHyperion("effect", "", '"effect":{"name":"' + effectName + '"},"priority":' + this.priority + ',"duration":' + duration * 1000 + ',"origin":"' + this.origin + '"', this.wsTan, function(err, data) {
      callback(err, data);
    });
  }

  /**
   * setBrightness: Set the led brightness
   * @param {number}   value    0 to 100
   * @param {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  setBrightness(value, callback) {
    this.sendToHyperion("adjustment", "", '"adjustment": {"brightness": ' + value + '}', this.wsTan, function(err, data) {
      callback(err, data);
    });
  }

  /**
   * setSourceToAutoSelection: Activates autoselection
   * @param {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  setSourceToAutoSelection(callback) {
    this.sendToHyperion("sourceselect", "", '"auto":true', this.wsTan, function(err, data) {
      callback(err, data);
    });
  }

  /**
   * setSource: set a source (priority) to active
   * @param {number}   priority You can use getAllPriorities to get the id
   * @param {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  setSource(priority, callback) {
    this.sendToHyperion("sourceselect", "", '"priority":' + priority, this.wsTan, function(err, data) {
      callback(err, data);
    });
  }

  /**
   * clearPriority: clears the given priority
   * @param  {number}   priority You can use getAllPriorities to get the id
   * @param  {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  clearPriority(priority, callback) {
    this.sendToHyperion("clear", "", '"priority":' + priority + '', this.wsTan, function(err, data) {
      callback(err, data);
    });
  }

  /**
   * clearApiPriority: clears the priority which is used by this api
   * @param  {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  clearApiPriority(callback) {
    this.sendToHyperion("clear", "", '"priority":' + this.priority + '', this.wsTan, function(err, data) {
      callback(err, data);
    });
  }

  /**
   * clearAllPriority: clears all priority
   * @param  {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  clearAllPriority(callback) {
    this.sendToHyperion("clearall", "", "", this.wsTan, function(err, data) {
      callback(err, data);
    });
  }

  playStatupEffect(callback) {
    var obj = this;
    obj.getStartupEffect(function(err, data) {
      let duration_s = data.duration_ms/1000;
      obj.setEffect(data.effect, data.duration_ms/1000, function(err, data) {
        callback(err, data);
      });
    });
  }

  /**
   * sendToHyperion: Main function to communicate with hyperion.ng. This function is calles by the other functions. If you know the commands you want to call on hyperion side you can call this function directly.
   * @param  {string}   command
   * @param  {string}   subcommand
   * @param  {string}   msg
   * @param  {number}   wsTan
   * @param  {Function} callback
   * @return {Function} callback return string from hyperion.ng
   */
  sendToHyperion(command, subcommand, msg, wsTan, callback) {
    const client = new WebSocketClient();
    client.connect('ws://' + this.host + ':' + this.port + '/');
    let response = "";

    client.on('connectFailed', function(error) {
      callback(error, null);
    });

    client.on('connect', function(connection) {
      connection.on('error', function(error) {
        callback(error, null);
      });

      connection.on('message', function(message) {
        if (message.type === 'utf8') {
          response = JSON.parse(message.utf8Data);
          connection.close();
          (callback && response.success === true) ? callback(null, response): callback(response, null);
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
        connection.send('{"command":"' + command + '", "tan":' + wsTan + subcommand + msg + '}');
      }
    });
  }
}

module.exports = HyperionNg;
