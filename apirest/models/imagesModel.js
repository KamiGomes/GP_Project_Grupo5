//productMode.js
var mongoose = require('mongoose');

//schema
var imagesSchema = mongoose.Schema({
  animal: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'animal'
  }],
  name: {
    type: String,
    required: true,
    default: ""
  },
  length: {
    type: String,
    required: true,
    default: 0
  },
  filename: {
    type: String,
    required: true,
    default: 0
  },
  contenttype: {
    type: String,
    required: true,
    default: 0
  },
  contentdisposition: {
    type: String,
    required: true,
    default: 0
  }
});

var Images = module.exports = mongoose.model('images', imagesSchema);

module.exports.get = function (callback, limit) {
    Images.find(callback).limit(limit);
}
