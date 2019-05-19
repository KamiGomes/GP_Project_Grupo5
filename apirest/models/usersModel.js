//productMode.js
var mongoose = require('mongoose');

//schema
var usersSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    default: ""
  },
  name: {
    type: String,
    required: true,
    default: ""
  },
  password: {
    type: String,
    required: true,
    default: ""
  },
  confirmedemail: {
    type: Bool,
    required: true,
    default: false
  },
  street: {
    type: String,
    required: false,
    default: ""
  },
  postalcode: {
    type: String,
    required: false,
    default: ""
  },
  city: {
    type: String,
    required: false,
    default: ""
  },
  phone: {
    type: String,
    required: false,
    default: ""
  },
  dateofbirth: {
    type: DateTime,
    required: false,
    default: DateTime.now
  },
  role: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'role'
  }],
});

var Users = module.exports = mongoose.model('users', usersSchema);

module.exports.get = function (callback, limit) {
    Users.find(callback).limit(limit);
}
