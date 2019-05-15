//productMode.js
var mongoose = require('mongoose');

//schema
var donationproductSchema = mongoose.Schema({
  donation: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'donation'
  }],
  product: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'product'
  }],
  quantity: {
    type: Number,
    required: true,
    default: 0
  }
});

var DonationProduct = module.exports = mongoose.model('donationproduct', donationproductSchema);

module.exports.get = function (callback, limit) {
    DonationProduct.find(callback).limit(limit);
}
