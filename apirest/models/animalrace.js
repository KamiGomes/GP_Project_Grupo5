//productMode.js
var mongoose = require('mongoose');

//schema
var animalraceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: ""
  }
});

var AnimalRace = module.exports = mongoose.model('animalrace', animalraceSchema);

module.exports.get = function (callback, limit) {
    AnimalRace.find(callback).limit(limit);
}
