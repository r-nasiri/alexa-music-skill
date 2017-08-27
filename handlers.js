'use strict';

var util = require('./util');

function handlePlay(req, resp){
   util.play(req, resp,0,0,"REPLACE_ALL");
}

function handleResume(req, resp) {
   var deviceId = req.data.context.System.device.deviceId;
   var idx = util.getIndex(deviceId);
   if(!idx) idx=0;
   var offset = util.getOffset(deviceId);
   if(!offset) offset = 0; 
   util.play(req, resp, idx, offset, "REPLACE_ALL");

}

function handleStop(req, resp) {
    resp.audioPlayerStop();
}

function handleLoopOff(req, resp) {

}

function handleLoopOn(req, resp) {

}

function handleNext(req, resp) {
   var i = util.getNext(req.data.context.System.device.deviceId);
   if(!i) i = 0;
   util.play(req, resp, i,0,"REPLACE_ALL");
}

function handlePrevious(req, resp) {
   var i = util.getPrevious(req.data.context.System.device.deviceId);
   if(!i) i = 0;
   util.play(req, resp, i,0,"REPLACE_ALL");

}

module.exports = {
  handleNext : handleNext,
  handlePrevious : handlePrevious,
  handleLoopOff : handleLoopOff,
  handleLoopOn : handleLoopOn,
  handlePlay : handlePlay,
  handleResume : handleResume,
  handleStop : handleStop
}

