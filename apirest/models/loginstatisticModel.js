//productMode.js
var mongoose = require('mongoose');

//schema
var loginstatisticSchema = mongoose.Schema({
  datestatistic: {
    type: DateTime,
    required: true,
    default: ""
  },
  count: {
    type: Number,
    required: true,
    default: 0
  }
});

var LoginStatistic = module.exports = mongoose.model('loginstatistic', loginstatisticSchema);

module.exports.get = function (callback, limit) {
    LoginStatistic.find(callback).limit(limit);
}
