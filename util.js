'use strict';

var crypto = require('crypto');
var config = require('./musicConfig');

var cache = {};
const IndexProperty = 'INDEX';
const OffsetProperty = 'OFFSET';

function getSecure(url, expires, secret){
    var input= expires + url + " " + secret;
    var binaryHash = crypto.createHash("md5").update(input).digest();
    var base64Value = new Buffer(binaryHash).toString('base64');
    return base64Value.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g,'_');
}

function play(req, resp, index, offset, behavior){
   var next= config.files[index].path;
   var now = new Date();
   var expires = new Date(now.getTime() + 35*60000);
   expires = expires.getTime();
   var md5=getSecure(next, expires,config.secret);

   var stream = {
     "url": config.serverURL + next + "?expires=" + expires + "&md5=" + md5,
     "token": "token_"+index,
     "offsetInMilliseconds": offset
  };
  resp.audioPlayerPlayStream(behavior, stream);
}

function getNext(device) {
  var idx = getDeviceProperty(device,IndexProperty);
  idx = idx + 1;
  if(idx < config.files.length)
     return idx;
  return 0;
}

function getPrevious(device) {
    var idx= getDeviceProperty(device,IndexProperty);
    idx = idx - 1;
    if(idx >= 0)
      return idx;
    return config.files.length -1;
}

function getIndex(device) {
    return getDeviceProperty(device, IndexProperty);
}

function setIndex(device, i) {
  setDeviceProperty(device,IndexProperty,i);
}

function getOffset(device) {
    return getDeviceProperty(device,OffsetProperty);
}

function setOffset(device, offset) {
    setDeviceProperty(device,OffsetProperty,offset);
}


function setDeviceProperty(device, property, value) {
   var deviceData = cache[device];
   if(!deviceData) {
        deviceData={};
        cache[device] = deviceData;
   }
   if(typeof value === "number") {
       deviceData[property] = parseInt(value);
   } else {
       deviceData[property] = value;
   }

}

function getDeviceProperty(device, property) {
   var deviceData = cache[device];
   if(!deviceData) return null;
   return deviceData[property];
}

module.exports = {
  play : play,
  getNext : getNext,
  getPrevious : getPrevious,
  getOffset : getOffset,
  setOffset : setOffset,
  getIndex : getIndex,
  setIndex : setIndex
}

