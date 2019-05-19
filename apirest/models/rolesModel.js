//productMode.js
var mongoose = require('mongoose');

//schema
var rolesSchema = mongoose.Schema({
  rolename: {
    type: String,
    required: true,
    default: ""
  },
  component: {
    type: Number,
    required: true,
    default: 0
  },
  create: {
    type: Bool,
    required: false,
    default: false
  },
  read: {
    type: Bool,
    required: false,
    default: false
  },
  update: {
    type: Bool,
    required: false,
    default: false
  },
  delete: {
    type: Bool,
    required: false,
    default: false
  }
});

var Roles = module.exports = mongoose.model('roles', rolesSchema);

module.exports.get = function (callback, limit) {
    Roles.find(callback).limit(limit);
}
