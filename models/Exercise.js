const { Schema, mongoose } = require('mongoose');

const exerciseSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
