var express = require('express');
var path = require('path');
// var passport = require('passport');
var router = express.Router();
var video = require('../models/video');

router.get('/', function(req, res) {
  var indexPath = path.join(__dirname, '../public/views/index.html');
  res.sendFile(indexPath);
});

// router.post('/', passport.authenticate('local'), function(req, res) {
//     res.sendStatus(200);
// });

router.post('/', function (req,res){
  console.log('in save vid');
 var newVideo = {
   vidId: req.body.id
 };

 video.create(newVideo, function (err,next){
   if (err) {
     res.sendStatus(404);
   } else {
     res.send(newVideo);
   }
 });


});

module.exports = router;
