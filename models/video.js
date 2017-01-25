
var mongoose = require('mongoose');

var VideoSchema = mongoose.Schema({
    vidId: String
});

module.exports = mongoose.model('Videos', VideoSchema);
