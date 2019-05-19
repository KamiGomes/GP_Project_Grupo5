//productMode.js
var mongoose = require('mongoose');

//schema
var animaltypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: ""
  }
});

var AnimalType = module.exports = mongoose.model('animaltype', animaltypeSchema);

module.exports.get = function (callback, limit) {
    AnimalType.find(callback).limit(limit);
}
