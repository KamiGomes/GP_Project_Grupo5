//productMode.js
var mongoose = require('mongoose');

//schema
var producttypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: ""
  }
});

var ProductType = module.exports = mongoose.model('producttype', producttypeSchema);

module.exports.get = function (callback, limit) {
    ProductType.find(callback).limit(limit);
}
