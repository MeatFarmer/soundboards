var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var videoRouter = require('./routes/video');

var app = express();

// middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// server port set and listen
var serverPort = process.env.port || 3000;
app.set('port', serverPort);

var server = app.listen(serverPort, function() {
  console.log('up and listening on', server.address().port);
});

app.use('/', indexRouter);
app.use('/work', indexRouter);
app.use('/routers', videoRouter);

// connect to the mongodb
var mongoURI = "mongodb://localhost:27017/soundboard";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open!');
});
