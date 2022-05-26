const { Schema } = require('mongoose');

const logSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  log: {
    type: Array,
    required: true,
  },
});
const Log = mongoose.model('Log', logSchema);

module.exports = Log;
