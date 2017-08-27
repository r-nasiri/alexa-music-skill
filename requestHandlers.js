'use strict';
var util  = require('./util');


function handleStarted(req, resp){
   var token = req.data.request.token;
   var match = token.match(/token_(\d+)/); 
   var idx = Number(match[1]);
   util.setIndex(req.data.context.System.device.deviceId, idx);
}
  
function handleFinished(req, resp){

}

function handleStopped(req, resp) {
    util.setOffset(req.data.context.System.device.deviceId, req.data.request.offsetInMilliseconds);
}

function handleFailed(req, resp){
    console.log("playback failed" + req.data.request.error.message);
}

function handleNearlyFinished(req, resp){
    var idx = util.getNext(req.data.context.System.device.deviceId);
    util.play(req, resp,idx, 0,"REPLACE_ENQUEUED");
}

module.exports = {
  handleStarted : handleStarted,
  handleFinished : handleFinished,
  handleStopped : handleStopped,
  handleFailed  : handleFailed,
  handleNearlyFinished : handleNearlyFinished
}

