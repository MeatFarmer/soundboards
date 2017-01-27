var express = require('express');
var path = require('path');
// var passport = require('passport');
var router = express.Router();
var video = require('../models/video');

router.get('/', function(req, res) {
  var indexPath = path.join(__dirname, '../public/views/profile.html');
  res.sendFile(indexPath);
});

router.get('/getVid', function(req, res){
  console.log('inside getVid', req.body);
  video.find({}, function (err, video){
    if (err) next(err);
    else {
      res.send(video);
    }
  });
}); // end getVid

router.delete('/:id', function(req, res){
  video.findByIdAndRemove(req.params.id).then(function (err){
    console.log('err', err);
  });
  res.sendStatus(200);
});

module.exports = router;
