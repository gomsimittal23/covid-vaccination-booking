const mongoose = require("mongoose");
const CenterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  doses: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  workingHours: {
    type: String,
    required: true,
  },
});

const center = mongoose.model("center", CenterSchema);

module.exports = center;
