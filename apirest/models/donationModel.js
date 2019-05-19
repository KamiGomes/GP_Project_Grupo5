//productMode.js
var mongoose = require('mongoose');

//schema
var donationSchema = mongoose.Schema({
  dateofdonation: {
    type: DateTime,
    required: true,
    default: DateTime.now
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  }],
  usersname: {
    type: String,
    required: false,
    default: 0
  },
  productname: {
    type: String,
    required: false,
    default: 0
  }
});

var Donation = module.exports = mongoose.model('donation', donationSchema);

module.exports.get = function (callback, limit) {
    Donation.find(callback).limit(limit);
}
