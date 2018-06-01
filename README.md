# Hyperion NG Api

This is a early version. Still to do a lot. Testing, documentation and implementing more functionality.

### Installation
```sh
$ npm install --save hyperion-ng-api
```

### Usage
```
const HyperionNg = require('hyperion-ng-api');

//Host, Port, WsTan, Priority (Use 1 if you want to overwrite WebUI priority. Remember WebUI is always priority 1.)
hyperion = new HyperionNg('192.168.178.23', 19444, 666, 1);

hyperion.getServerInfo(function (err, data){
  (err) ? console.log(err) : console.log(data);
})
```


### Documentation (not complete)

-   [disableHyperion][1]
-   [enableHyperion][2]
-   [disableLedDevice][3]
-   [enableLedDevice][4]
-   [getServerInfo][5]
-   [getAllComponents][6]
-   [getAllEffects][7]
-   [getAllGrabbers][8]
-   [getAllLedDevices][9]
-   [getLedMappingType][10]
-   [getAllPriorities][11]
-   [getSysInfo][12]
-   [setMappingTypeMulticolor][13]
-   [setMappingTypeUnicolor][14]
-   [setMappingType][15]

## disableHyperion

disableHyperion: Disables all activated components. The Ng-Way to switch off.

**Parameters**

-   `callback` **[Function][16]**

Returns **[Function][16]** callback return string from hyperion.ng

## enableHyperion

enableHyperion: Enables all previous activated components. The Ng-Way to switch on.

**Parameters**

-   `callback` **[Function][16]**

Returns **[Function][16]** callback return string from hyperion.ng

## disableLedDevice

disableLedDevice: Disables the LED Device. You can see this as "send color black"

**Parameters**

-   `callback` **[Function][16]**

Returns **[Function][16]** callback return string from hyperion.ng

## enableLedDevice

enableLedDevice: Activates the LED Device.

**Parameters**

-   `callback` **[Function][16]**

Returns **[Function][16]** callback return string from hyperion.ng

## getServerInfo

getServerInfo: Get the server info JSON. All information you need from hyperion. There are more functions available to wrap this. Eg: getAllEffects

**Parameters**

-   `callback` **[Function][16]**

Returns **[Function][16]** callback return string from hyperion.ng

## getAllComponents

getAllComponents: Get all components. Wrap function for getServerInfo

**Parameters**

-   `callback` **[Function][16]**

Returns **[Function][16]** callback return string from hyperion.ng

## getAllEffects

getAllEffects: Get all effects. Wrap function for getServerInfo

**Parameters**

-   `callback` **[Function][16]**

Returns **[Function][16]** callback return string from hyperion.ng

## getAllGrabbers

getAllGrabbers: Get all Grabbers. Wrap function for getServerInfo

**Parameters**

-   `callback` **[Function][16]**

Returns **[Function][16]** callback return string from hyperion.ng

## getAllLedDevices

getAllLedDevices: Get all led devices. Wrap function for getServerInfo

**Parameters**

-   `callback` **[Function][16]**

Returns **[Function][16]** callback return string from hyperion.ng

## getLedMappingType

getLedMappingType: Get the current led mapping type. Wrap function for getServerInfo

**Parameters**

-   `callback` **[Function][16]**

Returns **[Function][16]** callback return string from hyperion.ng

## getAllPriorities

getAllPriorities: Get all priorities. Wrap function for getServerInfo

**Parameters**

-   `callback` **[Function][16]**

Returns **[Function][16]** callback return string from hyperion.ng

## getSysInfo

getSysInfo: Get system information about the operating system of hyperion.ng instance

**Parameters**

-   `callback` **[Function][16]**

Returns **[Function][16]** callback return string from hyperion.ng

## setMappingTypeMulticolor

setMappingTypeMulticolor: Set the Led Mapping Type to multicolor (classic atmolight)

**Parameters**

-   `callback` **[Function][16]**

Returns **[Function][16]** callback return string from hyperion.ng

## setMappingTypeUnicolor

setMappingTypeMulticolor: Set the Led Mapping Type to unicolor (one color calculated and send to ALL leds)

**Parameters**

-   `callback` **[Function][16]**

Returns **[Function][16]** callback return string from hyperion.ng

## setMappingType

setMappingType: Set the Led Mapping type. Currently 'unicolor_mean' and 'multicolor_mean' is supported. Inserting something other will likely result in an error

**Parameters**

-   `type` **[string][17]** for now only use 'unicolor_mean' or 'multicolor_mean'
-   `callback` **[Function][16]**

Returns **[Function][16]** callback return string from hyperion.ng

[1]: #disablehyperion

[2]: #enablehyperion

[3]: #disableleddevice

[4]: #enableleddevice

[5]: #getserverinfo

[6]: #getallcomponents

[7]: #getalleffects

[8]: #getallgrabbers

[9]: #getallleddevices

[10]: #getledmappingtype

[11]: #getallpriorities

[12]: #getsysinfo

[13]: #setmappingtypemulticolor

[14]: #setmappingtypeunicolor

[15]: #setmappingtype

[16]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[17]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String
