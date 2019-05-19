//productMode.js
var mongoose = require('mongoose');

//schema
var animalProductSchema = mongoose.Schema({
  animal: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'animal'
  }],
  product: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  }]
});

var Product = module.exports = mongoose.model('animalProduct', animalProductSchema);

module.exports.get = function (callback, limit) {
    Product.find(callback).limit(limit);
}
