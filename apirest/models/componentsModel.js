//productMode.js
var mongoose = require('mongoose');

//schema
var componentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: ""
  },
  namefront: {
    type: String,
    required: true,
    default: ""
  },
});

var Component = module.exports = mongoose.model('component', componentSchema);

module.exports.get = function (callback, limit) {
    Component.find(callback).limit(limit);
}
