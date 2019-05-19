//productMode.js
var mongoose = require('mongoose');

//schema
var animalSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: ""
  },
  dateOfBirth: {
    type: DateTime,
    required: true,
    default: DateTime.now
  },
  disinfection: {
    type: Bool ,
    required: true,
    default: true
  },
  neutered: {
    type: Bool,
    required: true,
    default: true
  },
  description: {
    type: String,
    required: true,
    default: ""
  },
  animaltypes: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'animaltype'
  }],
  animalraces: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'animalraces'
  }],
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }]
});

var Animal = module.exports = mongoose.model('animal', animalSchema);

module.exports.get = function (callback, limit) {
    Animal.find(callback).limit(limit);
}
