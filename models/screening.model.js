const mongoose = require("mongoose");

const screeningSchema = new mongoose.Schema(
  {
    question: {
      type: String,
    },
    answer: {
      default: [],
      type: Array,
    },
  },
  { timestamps: true }
);

const ScreeningSchema = mongoose.model("Screening", screeningSchema);

module.exports = ScreeningSchema;
