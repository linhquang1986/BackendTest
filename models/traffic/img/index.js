var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var trafficdatabase = require('../connection');

var imgSchema = new Schema({
    url: String,
    name: String,
    crowd: Number,
    community: Number,
    youth: Number,
    child: Number,
    recreation: Number,
    audiance: Number,
    tourism: Number,
    publicEvent: Number,
    festival: Number,
    fun: Number,
    city: Number,
    blockParty: Number,
    Fete: Number,
    leisure: Number,
    class: Number,
    created_at: Date
});

//var Img = mongoose.model('Img', imgSchema);
var Img = trafficdatabase.model('Img', imgSchema);
module.exports = Img;