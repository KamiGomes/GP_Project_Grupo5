//productMode.js
var mongoose = require('mongoose');

//schema
var registerstatisticsSchema = mongoose.Schema({
  datestatistic: {
    type: DateTime,
    required: true,
    default: DateTime.now
  },
  count: {
    type: Number,
    required: true,
    default: 0
  }
});

var RegisterStatistic = module.exports = mongoose.model('registerstatistic', registerstatisticsSchema);

module.exports.get = function (callback, limit) {
    RegisterStatistic.find(callback).limit(limit);
}
