'use strict';

var express= require('express');
var alexa = require('alexa-app');
var handlers = require('./handlers.js');
var requestHandlers = require('./requestHandlers.js');

var express_app = express();

var app = new alexa.app("alexa2/music");

app.express({
	expressApp: express_app,
        checkCert : false
        });

app.launch(handlers.handlePlay);

app.intent("PlayMusic",handlers.handlePlay); 

app.intent("AMAZON.PauseIntent" ,{
  "slots": {},
  "utterances": []
},handlers.handleStop);

app.intent("AMAZON.CancelIntent" ,{
  "slots": {},
  "utterances": []
},handlers.handleStop);

app.intent("AMAZON.LoopOffIntent" ,{
  "slots": {},
  "utterances": []
},handlers.handleLoopOff);

app.intent("AMAZON.LoopOnIntent" ,{
  "slots": {},
  "utterances": []
},handlers.handleLoopOn);

app.intent("AMAZON.NextIntent" ,{
  "slots": {},
  "utterances": []
},handlers.handleNext);

app.intent("AMAZON.PreviousIntent" ,{
  "slots": {},
  "utterances": []
},handlers.handlePrevious);

app.intent("AMAZON.RepeatIntent" ,{
  "slots": {},
  "utterances": []
},handlers.handleStop);

app.intent("AMAZON.ResumeIntent" ,{
  "slots": {},
  "utterances": []
},handlers.handleResume);

app.intent("AMAZON.ShuffleOffIntent" ,{
  "slots": {},
  "utterances": []
},handlers.handleStop);

app.intent("AMAZON.ShuffleOnIntent" ,{
  "slots": {},
  "utterances": []
},handlers.handleStop);

app.intent("AMAZON.StartOverIntent" ,{
  "slots": {},
  "utterances": []
},handlers.handlePlay);

app.audioPlayer("PlaybackNearlyFinished", requestHandlers.handleNearlyFinished);
app.audioPlayer("PlaybackStarted", requestHandlers.handleStarted);
app.audioPlayer("PlaybackFinished",requestHandlers.handleFinished);
app.audioPlayer("PlaybackStopped",requestHandlers.handleStopped);
app.audioPlayer("PlaybackFailed",requestHandlers.handleFailed);

var server = express_app.listen(8099, function(){
  console.log("Music App started");
});


