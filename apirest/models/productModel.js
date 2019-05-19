//productMode.js
var mongoose = require('mongoose');

//schema
var productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: ""
  },
  quantity: {
    type: Number,
    required: false,
    default: 0
  },
  weekstock: {
    type: Number,
    required: false,
    default: 0
  },
  monthstock: {
    type: Number,
    required: false,
    default: 0
  },
  animaltypes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'animaltype'
  }],
  producttypes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'producttype'
  }]
});

var Product = module.exports = mongoose.model('product', productSchema);

module.exports.get = function (callback, limit) {
    Product.find(callback).limit(limit);
}

 
