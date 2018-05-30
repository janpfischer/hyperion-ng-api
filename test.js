"use strict";
const net = require('net');
const Color = require('color');

class Hyperion {
    constructor (host, port) {
        this.host = host;
        this.port = port;
        this.color = Color;
        this.selectedColor = this.color.rgb(255, 255, 255);
        this.ledState = false;
        this.ambiState = false;
        this.effectState = false;
        this.lightState = false;
        this.CMD = {
            clearall: {
                command: "clearall"
            },
            colorCommand: {
                command: "color",
                priority: 100,
                color: this.selectedColor.rgb().round().array()
            },
            offCommand: {
                command: "color",
                priority: 100,
                color: this.color.rgb(0, 0, 0).round().array()
            },
            effectCommand: {
                command: "effect",
                effect: {
                    name: "Blue mood blobs"
                },
                priority: 100
            },
            serverInfo: {"command": "serverinfo"}
        };
    }

    send (command, callback) {
        const client = new net.Socket();
        client.setTimeout(1500);
        let response = "";
        client.connect(this.port, this.host, () => {
            const string = JSON.stringify(command) + "\n";
            client.write(string);
        });
        client.on('error', (error) => {
            callback(error, response);
        });
        client.on('data', (data) => {
            response += data.toString();
            client.end();
        });
        client.on('end', () => {
            const object = JSON.parse(response);
            if (callback) callback(null, object);
        });
        client.on('timeout', function() {
            client.destroy("timeout");
        });
    }

    setColor (color, callback) {
        this.selectedColor = color;
        this.CMD.colorCommand.color = color.rgb().round().array();
        this.send(this.CMD.colorCommand, callback);
    }

    getColor (callback) {
        callback(null, this.selectedColor);
    }

    setOn (callback) {
        this.send(this.CMD.colorCommand, callback);
    }

    verifyLightState (data) {
        if(data && data.info.activeLedColor) {
            this.ledState = data.info.activeLedColor.length > 0;
            this.effectState = data.info.activeEffects.length > 0;
        }
    }

    verifyOn () {
        this.lightState = this.ledState && !this.effectState;
    }

    verifyAmbiState () {
        this.ambiState = !this.ledState && !this.effectState;
    }

    extractColorFromData (data) {
        if (this.lightState && data && data.info.activeLedColor) {
            this.selectedColor = this.color.rgb(data.info.activeLedColor[0]["RGB Value"]);
        }
    }

    getOn (callback) {
        this.send(this.CMD.serverInfo, (error, data) => {
            this.verifyLightState(data);
            this.verifyOn();
            this.extractColorFromData(data);
            callback(error, this.ledState);
        });
    }

    setOff (callback) {
        this.send(this.CMD.offCommand, callback);
    }

    setAmbiStateOn (callback) {
        this.send(this.CMD.clearall, callback);
    }

    getAmbiState (callback) {
        this.send(this.CMD.serverInfo, (error, data) => {
            this.verifyLightState(data);
            this.verifyAmbiState();
            callback(error, this.ambiState);
        });
    }

    setBrightness (value, callback) {
        this.selectedColor = this.selectedColor.value(value);
        this.setColor(this.selectedColor, callback);
    }

    getBrightness (callback) {
        this.send(this.CMD.serverInfo, (error, data) => {
            this.verifyLightState(data);
            this.verifyOn();
            this.extractColorFromData(data);
            callback(error, this.selectedColor.value());
        });
    }

    setHue (value, callback) {
        this.selectedColor = this.selectedColor.hue(value);
        this.setColor(this.selectedColor, callback);
    }

    getHue (callback) {
        this.send(this.CMD.serverInfo, (error, data) => {
            this.verifyLightState(data);
            this.verifyOn();
            this.extractColorFromData(data);
            callback(error, Math.round(this.selectedColor.hue()));
        });
    }

    setSaturation (value, callback) {
        this.selectedColor = this.selectedColor.saturationv(value);
        this.setColor(this.selectedColor, callback);
    }

    getSaturation (callback) {
        this.send(this.CMD.serverInfo, (error, data) => {
            this.verifyLightState(data);
            this.verifyOn();
            this.extractColorFromData(data);
            callback(error, Math.round(this.selectedColor.saturationv()));
        });
    }
}

module.exports = Hyperion;
