//productMode.js
var mongoose = require('mongoose');

//schema
var animaluserSchema = mongoose.Schema({
  animal: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'animal'
  }],
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  }]
});

var AnimalUser = module.exports = mongoose.model('animaluser', animaluserSchema);

module.exports.get = function (callback, limit) {
    AnimalUser.find(callback).limit(limit);
}
