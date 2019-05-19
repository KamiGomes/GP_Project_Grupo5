//productMode.js
var mongoose = require('mongoose');

//schema
var roleauthorizationSchema = mongoose.Schema({
  role: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'role'
  }],
  component: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'component'
  }],
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
  },
});

var RoleAuthorization = module.exports = mongoose.model('roleauthorization', roleauthorizationSchema);

module.exports.get = function (callback, limit) {
    RoleAuthorization.find(callback).limit(limit);
}
